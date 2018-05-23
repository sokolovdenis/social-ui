import {
    FETCH_USER_DATA,
    FETCH_USERS_DATA,
    FETCH_USERS_LIST
} from './actionTypes';

const API_URL = 'http://social-webapi.azurewebsites.net/api/';

export const logOut = () => async dispatch => {
    const initialState = {
        name: "",
        id: 0,
        token: 0,
        email: "",
        info: "",
        imageUrl: "",
        birthday: new Date()
    };

    dispatch({
        type: FETCH_USER_DATA,
        payload: initialState
    });
};

export const identityIn = user => async dispatch => (
    fetch(API_URL + 'identity/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: user.email,
            password: user.password
        })
    })
        .then(res => {
            if (res.status === 400) {
                throw {
                    message: 'Неверный e-mail или пароль',
                    code: 400
                };
            }
            return res.json();
        })
        .then(data => {
            dispatch({
                type: FETCH_USER_DATA,
                payload: {token: data.token}
            });

            return data.token;

        })
);

export const identityUp = user => async dispatch => (
    fetch(API_URL + 'identity/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: user.email,
            password: user.password,
            name: user.name,
            birthday: new Date(user.birthday).toISOString()
        })
    })
        .then(res => {
            if (res.status === 409) {
                throw {
                    message: 'Такой e-mail уже зарегистрирован',
                    code: 409
                };
            }
            if (res.status === 400) {
                throw {
                    message: 'Некорректные данные',
                    code: 400
                };
            }
            return res.json();
        })
        .then(data => {
            dispatch({
                type: FETCH_USER_DATA,
                payload: {token: data.token}
            });

            return data.token;

        })
);

export const login = token => async dispatch => {
    dispatch({
        type: FETCH_USER_DATA,
        payload: {token: token}
    });

    return fetch(API_URL + 'users/me', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'content-type': 'application/json'
        }
    })
        .then(res => {
            if (res.status === 400) {
                throw {
                    message: 'Неверный e-mail или пароль',
                    code: 400
                };
            }
            return res.json();
        })
        .then(data => {
            dispatch({
                type: FETCH_USER_DATA,
                payload: {id: data.id}
            });
        });
};


export const fetchUserData = (token, id) => async dispatch => {
    return fetch(API_URL + 'users/' + id, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: FETCH_USERS_DATA,
                payload: { id: id, data: data }
            });
        })
};

export const fetchMeData = token => async dispatch => {
  return fetch(API_URL + 'users/me', {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + token
      }
  })
      .then(res => res.json())
      .then(data => {
          dispatch({
              type: FETCH_USER_DATA,
              payload: data
          });
          return data.id;
      })
};

export const fetchUserFollowers = (token, id) => async dispatch => {

    return fetch(API_URL + 'users/' + id + '/followers', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(res => res.json())
        .then(data => {
            const followers = {
                followers: data
            };

            dispatch({
                type: FETCH_USERS_DATA,
                payload: { id: id, data: followers }
            });
        })
};

export const fetchUserFollowings = (token, id) => async dispatch => {

    return fetch(API_URL + 'users/' + id + '/followings', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(res => res.json())
        .then(data => {
            const followings = {
                followings: data
            };

            dispatch({
                type: FETCH_USERS_DATA,
                payload: { id: id, data: followings }
            });
        })
};

export const fetchUserPosts = (token, id, type) => async dispatch => {

    fetch(API_URL + 'users/' + id + '/posts/' + type, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(res => res.json())
        .then(data => {
            const posts = {
                [type]: data
            };

            dispatch({
                type: FETCH_USERS_DATA,
                payload: { id: id, data: posts }
            });
        });

    return id;
};

export const fetchUsers = token => async dispatch => {

    return fetch(API_URL + 'users' , {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: FETCH_USERS_LIST,
                payload: data
            });
        })
};

export const setTypePosts = data => async dispatch => {
    dispatch({
        type: FETCH_USER_DATA,
        payload: data
    });
};
