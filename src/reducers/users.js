import { REQUEST_USERS, RECEIVE_USERS, RECEIVE_USERS_ERROR } from '../actions/actions'

function users(
  state = {
    isFetching: true,
    error: null,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_USERS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_USERS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.data,
      })
    case RECEIVE_USERS_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })
    default:
      return state
  }
}

export default users
