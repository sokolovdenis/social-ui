import fetch from 'cross-fetch'

export const ROOT_URL = 'http://social-webapi.azurewebsites.net/api/'

export const SET_TOKEN = 'SET_TOKEN'
export const RESET_TOKEN = 'RESET_TOKEN'
export const SET_ID = 'SET_ID'
export const REQUEST_MY_FOLLOWINGS = 'REQUEST_MY_FOLLOWINGS'
export const RECEIVE_MY_FOLLOWINGS = 'RECEIVE_MY_FOLLOWINGS'

export const REQUEST_USERS = 'REQUEST_USERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const RECEIVE_USERS_ERROR = 'RECEIVE_USERS_ERROR'

export const REQUEST_PROFILE = 'REQUEST_PROFILE'
export const RECEIVE_PROFILE_DATA = 'RECEIVE_PROFILE_DATA'
export const RECEIVE_PROFILE_FOLLOWERS = 'RECEIVE_PROFILE_FOLLOWERS'
export const RECEIVE_PROFILE_FOLLOWINGS = 'RECEIVE_PROFILE_FOLLOWINGS'
export const RECEIVE_PROFILE_SUCCESS = 'RECEIVE_PROFILE_SUCCESS'
export const RECEIVE_PROFILE_ERROR = 'RECEIVE_PROFILE_ERROR'
export const FOLLOW_USER = 'FOLLOW_USER'
export const UNFOLLOW_USER = 'UNFOLLOW_USER'
export const EDIT_SELF = 'EDIT_SELF'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POSTS_ERROR = 'RECEIVE_POSTS_ERROR'
export const ADD_POST = 'ADD_POST'

export const checkResponse = (response, noJson) => {
  if (response.status >= 400) {
    let error = new Error(response.statusText)
    error.response = response
    throw error
  }
  return noJson ? response : response.json()
}

export function fetchWithCheck(url, token, header, noJson) {
  return fetch(url, Object.assign({}, header, {
    headers: { Authorization: 'Bearer ' + token }
  }))
    .then(response => checkResponse(response, noJson))
}

export const handleError = (error, callback) => {
  if (error.response) {
    return error.response.text()
    .then(text => {
      try {
        return JSON.parse(text)
      }
      catch(e) {
        return text
      }
    })
    .then(text => callback(text))
  }
  return callback(error.message)
}