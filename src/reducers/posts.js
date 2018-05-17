import { REQUEST_POSTS, RECEIVE_POSTS, RECEIVE_POSTS_ERROR, ADD_POST } from '../actions/actions'

function posts(
  state = {
    isFetching: true,
    error: null,
    userId: null,
    isFeed: null,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        userId: action.userId,
        isFeed: action.isFeed
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.data,
      })
    case RECEIVE_POSTS_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })
    case ADD_POST:
      const newItems = [action.data, ...state.items]
      return Object.assign({}, state, {
        items: newItems
      })
    default:
      return state
  }
}

export default posts
