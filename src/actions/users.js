import {
  fetchWithCheck,
  ROOT_URL,
  REQUEST_USERS,
  RECEIVE_USERS,
  RECEIVE_USERS_ERROR
} from './actions'

function requestUsers() {
  return {
    type: REQUEST_USERS
  }
}
function receiveUsers(json) {
  return {
    type: RECEIVE_USERS,
    data: json//.data.children.map(child => child.data),
  }
}

function receiveUsersError(error) {
  return {
    type: RECEIVE_USERS_ERROR,
    error
  }
}

export function fetchUsers(token, force) {
  return (dispatch, getState) => {
    const usersLoaded = getState().users.items.length > 0
    if (usersLoaded && !force) {
      return
    }

    dispatch(requestUsers());
    return fetchWithCheck(ROOT_URL + 'users', token)
      .then(json => dispatch(receiveUsers(json)))
      .catch(err => dispatch(receiveUsersError(err)))
  }
}
