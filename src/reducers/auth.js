import { 
  SET_TOKEN, RESET_TOKEN, SET_ID, 
  REQUEST_MY_FOLLOWINGS, RECEIVE_MY_FOLLOWINGS,
  FOLLOW_USER, UNFOLLOW_USER 
} from '../actions/actions'

const initialState = {
  token: null,
  id: null,
  followings: [],
  isFetching: false
}

export default function auth (state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return Object.assign({}, state, {
        token: action.token
      })
    case SET_ID:
    return Object.assign({}, state, {
      id: action.id
    })
    case REQUEST_MY_FOLLOWINGS:
    return Object.assign({}, state, {
      isFetching: true
    })
    case RECEIVE_MY_FOLLOWINGS:
    return Object.assign({}, state, {
      isFetching: false,
      followings: action.data
    })
    case FOLLOW_USER: {
      const newFollowings = [...state.followings, action.id]
      return Object.assign({}, state, {
        followings: newFollowings
      })}
    case UNFOLLOW_USER: {
      const newFollowings = state.followings.filter(id => (id !== action.id))
      return Object.assign({}, state, {
        followings: newFollowings
      })}
    case RESET_TOKEN:
      return initialState
    default:
      return state
  }
}
