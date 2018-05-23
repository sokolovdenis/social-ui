import {
    SET_AUTH,
    SET_UID,
    SET_USERNAME,
    SET_USERS,
    SET_FOLLOWERS,
    SET_FEED,
    SET_WALL,
    SET_USERINFO
} from './actionTypes';
import { api_login, api_register, api_users_all, api_me,
   api_followings, api_follow, api_feed, api_wall, api_users_info,
   api_post, api_post_image } from '../api'
import { setAuthentication, getAuthHeader } from '../auth'

function getGetHeaders() {
  const authHeader = getAuthHeader();
  return {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': authHeader
    }
  }
}

function toSet(followings) {
  return new Set(followings.map((object,i) => 
    object.id
  ));
}

function updateFollowings(uid, dispatch) {
  return fetch(api_followings(uid), getGetHeaders())
    .then(res => res.json())
    .then(followings => {
      const ids = toSet(followings);
      dispatch({
          type: SET_FOLLOWERS,
          payload: ids
      });
    });
}

export const updateCurrentUser = () => async dispatch => {
  return fetch(api_me, getGetHeaders())
    .then(res => res.json())
    .then(({id, name, info, imageUrl, birthday}) => {
      dispatch({
          type: SET_UID,
          payload: id
      });
      dispatch({
          type: SET_USERNAME,
          payload: name
      });
      return id;
    });
}

export const setAuth = auth => async dispatch => {
    dispatch({
        type: SET_AUTH,
        payload: auth
    });
};

export const loginAuth = authState => async dispatch => {
    fetch(api_login,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: authState.email,
            password: authState.password,
        })
      }).then(res => res.json())
        .then(({token}) => {
          if(token === undefined) {
            throw 'Authentication Failed!';
          }
          setAuthentication(token, authState.remember);
          dispatch({
              type: SET_AUTH,
              payload: true
          });
          updateCurrentUser()(dispatch);
        }).catch(error => console.log(error));
};

export const registerAuth = authState => async dispatch => {
    if(authState.password !== authState.passwordCopy) {
      console.log('Passwords didn\'t match!');
      return;
    }
    fetch(api_register,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: authState.name,
            email: authState.email,
            password: authState.password,
            birthday: authState.birthday
        })
      }).then(res => res.json())
        .then(({token, name, email, password, birthday}) => {
          if(token === undefined) {
            throw {name:name, email:email, password:password, birthday:birthday};
          }
          setAuthentication(token, authState.remember);
          dispatch({
              type: SET_AUTH,
              payload: true
          });
          updateCurrentUser()(dispatch);
        }).catch(error => console.log(error));
};

export const allUsers = () => async dispatch => {
    updateCurrentUser()(dispatch).then( uid => fetch(api_users_all,getGetHeaders())
        .then(res => res.json())
        .then((data) => {          
          fetch(api_followings(uid), getGetHeaders())
            .then(res => res.json())
            .then(followings => {
              const ids = toSet(followings);
              dispatch({
                  type: SET_USERS,
                  payload: data
              });
              dispatch({
                  type: SET_FOLLOWERS,
                  payload: ids
              });
            });
        }).catch(error => console.log(error)));
};

export const getUser = uid => async dispatch => {
    fetch(api_users_info(uid), getGetHeaders())
        .then(res => res.json())
        .then( data => dispatch({
            type: SET_USERINFO,
            payload: data
        })).catch(error => console.log(error));
};

export const follow = (uid, myUid) => async dispatch => {
    const authHeader = getAuthHeader();
    fetch(api_follow(uid), {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': authHeader
      }
    }).then(() => updateFollowings(myUid, dispatch))
      .catch(error => console.log(error));
};

export const unfollow = (uid, myUid) => async dispatch => {
    const authHeader = getAuthHeader();
    fetch(api_follow(uid), {
      method: 'DELETE',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': authHeader
      }
    }).then(() => updateFollowings(myUid, dispatch))
      .catch(error => console.log(error));
};

export const getFeed = uid => async dispatch => {
    const authHeader = getAuthHeader();
    fetch(api_feed(uid), getGetHeaders())
    .then(res => res.json())
    .then(feedData => {
      dispatch({
          type: SET_FEED,
          payload: feedData
      });
    }).catch(error => console.log(error));
};

export const getWall = uid => async dispatch => {
    const authHeader = getAuthHeader();
    fetch(api_wall(uid), getGetHeaders())
    .then(res => res.json())
    .then(feedData => {
      dispatch({
          type: SET_WALL,
          payload: feedData
      });
    }).catch(error => console.log(error));
};

export const createPost = (post,uid) => async dispatch => {
    const authHeader = getAuthHeader();
    fetch(api_post,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': authHeader
        },
        body: JSON.stringify({
            text: post.text
        })
      }).then(res => res.json())
        .then(({id}) => {
            if(post.image !== null) {
                let a = new FormData();
                a.append('postId', id);
                a.append('imageFile', post.image);
                return fetch(api_post_image(id),
                {
                  method: 'PUT',
                  headers: {
                      'Access-Control-Allow-Origin': '*',
                      'Authorization': authHeader
                  },
                  body: a
                }).then(() => getWall(uid)(dispatch)).catch(error => console.log(error));
            } else {
                getWall(uid)(dispatch);
            }
          
        }).catch(error => console.log(error));
};