import Cookies from 'universal-cookie'
import {
  ROOT_URL,
  SET_TOKEN, RESET_TOKEN, SET_ID,
  RECEIVE_MY_FOLLOWINGS, REQUEST_MY_FOLLOWINGS,
  FOLLOW_USER, UNFOLLOW_USER,
  fetchWithCheck
} from './actions'

const cookies = new Cookies()

function setToken(token) {
  return {
    type: SET_TOKEN,
    token
  }
}

function setId(id) {
  return {
    type: SET_ID,
    id
  }
}

function requestFollowings() {
  return {
    type: REQUEST_MY_FOLLOWINGS,
  }
}

function receiveFollowings(json) {
  return {
    type: RECEIVE_MY_FOLLOWINGS,
    data: json.map(x => x.id)
  }
}

export function logIn(token, setCookie) {
  return dispatch => {
    if (setCookie) {
      cookies.set('token', token)
    }
    dispatch(setToken(token))
    dispatch(fetchId(token))
  }
}

export function logOut() {
  cookies.remove('token')
  cookies.remove('userId')
  return dispatch => dispatch({ type: RESET_TOKEN })
}

export function fetchId(token) {
  return dispatch => (
    fetchWithCheck(ROOT_URL + '/users/me', token)
      .then(json => {
        cookies.set('userId', json.id)
        return dispatch(setId(json.id))
      })
      .catch(err => alert(err))
  )
}

export function fetchMyFollowings(token) {
  return (dispatch, getState) => {
    const state = getState()
    if (state.auth.followings.length > 0 || state.auth.isFetching) {
      return
    }
    dispatch(requestFollowings())
    return (fetchWithCheck(ROOT_URL + '/users/' + state.auth.id + '/followings', token)
      .then(json => {
        return dispatch(receiveFollowings(json))
      })
      .catch(err => alert(err)))
  }
}

function followUser(id) {
  return {
    type: FOLLOW_USER,
    id
  }
}

function unfollowUser(id) {
  return {
    type: UNFOLLOW_USER,
    id
  }
}

export function follow(id, token) {
  return dispatch => {
    fetchWithCheck(ROOT_URL + 'users/me/followings/' + id, token, {
      method: 'POST'
    }, "noJson")
      .then(() => dispatch(followUser(id)))
      .catch(err => alert(err))
  }
}

export function unfollow(id, token) {
  return dispatch => {
    fetchWithCheck(ROOT_URL + 'users/me/followings/' + id, token, {
      method: 'DELETE'
    }, "noJSON")
      .then(() => dispatch(unfollowUser(id)))
      .catch(err => alert(err))
  }
}