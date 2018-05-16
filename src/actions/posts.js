import {
  fetchWithCheck,
  ROOT_URL,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  RECEIVE_POSTS_ERROR,
  ADD_POST,
  checkResponse
} from './actions'

function requestPosts(userId, isFeed) {
  return {
    type: REQUEST_POSTS,
    userId,
    isFeed
  }
}

function receivePosts(json) {
  return {
    type: RECEIVE_POSTS,
    data: json
  }
}

function receivePostsError(error) {
  return {
    type: RECEIVE_POSTS_ERROR,
    error
  }
}

function fetchPosts(url, token) {
  return dispatch => (
    fetchWithCheck(url, token)
    .then(json => dispatch(receivePosts(json)))
    .catch(err => dispatch(receivePostsError(err)))
  )
}

export function fetchWall(userId, token, force) {
  return (dispatch, getState) => {
    const posts = getState().posts
    if (!posts.error && posts.userId === userId && !posts.isFeed && !force) {
      return;
    }

    dispatch(requestPosts(userId, false));
    return dispatch(fetchPosts(ROOT_URL + 'users/' + userId + '/posts/wall', token))
  }
}

export function fetchFeed(userId, token, force) {
  return (dispatch, getState) => {
    const posts = getState().posts
    if (!posts.error && posts.userId === userId && posts.isFeed && !force) {
      return;
    }
    dispatch(requestPosts(userId, true));
    return dispatch(fetchPosts(ROOT_URL + 'users/' + userId + '/posts/feed', token))
  }
}

function addPost(json) {
  return {
    type: ADD_POST,
    data: json
  }
}

export function fetchNewPost(data, token) {
  return dispatch => {
    fetch(ROOT_URL + 'users/me/posts', {
      method: 'POST',
      headers: { 
        Authorization: 'Bearer ' + token,
        'content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: data.text
      })
    }) 
  .then(response => checkResponse(response)) 
  .then(json => {
    if (data.image) {
      let formData = new FormData()
      formData.append('imageFile', data.image)

      fetchWithCheck(ROOT_URL + 'users/me/posts/' + json.id + '/image', token, {
        method: 'PUT',
        body: formData 
      })
      .then(json => dispatch(addPost(json)))
    } else {
      dispatch(addPost(json))
    }
  })
  .catch(err => alert(err))
}}