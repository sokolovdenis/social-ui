import {
  REQUEST_PROFILE,
  RECEIVE_PROFILE_DATA,
  RECEIVE_PROFILE_FOLLOWERS,
  RECEIVE_PROFILE_FOLLOWINGS,
  RECEIVE_PROFILE_SUCCESS,
  RECEIVE_PROFILE_ERROR,
  EDIT_SELF
} from '../actions/actions'

const info = (state = { isFetching: true, error: null }, action) => {
  switch (action.type) {
    case RECEIVE_PROFILE_DATA: {
      let { id, name, info: userInfo, imageUrl, birthday } = action.data;
      return Object.assign({}, state, {
        isFetching: false,
        id, name, userInfo, imageUrl, birthday
      })
    }
    case EDIT_SELF: {
      let { name, info: userInfo, birthday } = action.data;
      return Object.assign({}, state, {
        name, userInfo, birthday
      })
    }
    default:
      return state
  }
}

const followers = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PROFILE_FOLLOWERS:
      return action.data
    default:
      return state
  }
};

const followings = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PROFILE_FOLLOWINGS:
      return action.data
    default:
      return state
  }
};

const profile = (state = { isFetching: false, isSelf: false, error: null }, action) => {
  switch (action.type) {
    case REQUEST_PROFILE:
      return Object.assign({}, state, {
        isFetching: 3,
      })
    case RECEIVE_PROFILE_FOLLOWINGS:
      return Object.assign({}, state, {
        isFetching: state.isFetching - 1,
        followings: followings(state.followings, action)
      })
    case RECEIVE_PROFILE_FOLLOWERS:
      return Object.assign({}, state, {
        isFetching: state.isFetching - 1,
        followers: followers(state.followers, action)
      })
    case RECEIVE_PROFILE_DATA:
      return Object.assign({}, state, {
        isFetching: state.isFetching - 1,
        info: info(state.info, action)
      })
    case RECEIVE_PROFILE_ERROR:
      return Object.assign({}, state, {
        isFetching: 0,
        error: action.error
      })
    default:
      return {
        ...state,
        info: info(state.info, action),
        followers: followers(state.followers, action),
        followings: followings(state.followings, action)
      }
  }
}

export default profile
