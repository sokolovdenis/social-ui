import {
  fetchWithCheck,
  ROOT_URL,
  REQUEST_PROFILE,
  RECEIVE_PROFILE_DATA,
  RECEIVE_PROFILE_FOLLOWERS,
  RECEIVE_PROFILE_FOLLOWINGS,
  RECEIVE_PROFILE_SUCCESS,
  RECEIVE_PROFILE_ERROR,
  EDIT_SELF
} from './actions'

function requestProfile() {
  return {
    type: REQUEST_PROFILE
  }
}

function receiveProfileData(json) {
  return {
    type: RECEIVE_PROFILE_DATA,
    data: json
  }
}

function receiveProfileFollowers(json) {
  return {
    type: RECEIVE_PROFILE_FOLLOWERS,
    data: json
  }
}

function receiveProfileFollowings(json) {
  return {
    type: RECEIVE_PROFILE_FOLLOWINGS,
    data: json
  }
}

function receiveProfileSuccess(error) {
  return {
    type: RECEIVE_PROFILE_SUCCESS,
  }
}

function receiveProfileError(error) {
  return {
    type: RECEIVE_PROFILE_ERROR,
    error
  }
}

export function fetchProfile(userId, token, force) {
  return (dispatch, getState) => {
    const loaded = getState().profile.info.id == userId
    const inProgress = getState().profile.isFetching > 0
    if (loaded && !force || inProgress) {
      return
    }
    dispatch(requestProfile())
    return Promise.all([
      fetchWithCheck(ROOT_URL + 'users/' + userId, token)
        .then(json => dispatch(receiveProfileData(json))),
      fetchWithCheck(ROOT_URL + 'users/' + userId + '/followers', token)
        .then(json => dispatch(receiveProfileFollowers(json))),
      fetchWithCheck(ROOT_URL + 'users/' + userId + '/followings', token)
        .then(json => dispatch(receiveProfileFollowings(json)))
    ])
      .then(dispatch(receiveProfileSuccess()))
      .catch(err => dispatch(receiveProfileError(err)))
  }
}

export function editSelf(token, newData) {
  return dispatch => {
    fetchWithCheck(ROOT_URL + 'users/me', token, {
      method: 'PUT'
    })
      .then(() => dispatch({ type: EDIT_SELF, data: newData }))
      .catch(err => alert(err))
  }
}
