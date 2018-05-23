import { SET_UID, SET_USERNAME, SET_USERS, SET_USERINFO, SET_FOLLOWERS } from '../actions/actionTypes';

const initialState = [];

export default function uidReducers(state = initialState, { type, payload }) {
    switch (type) {
        case SET_UID:
            return Object.assign({}, state, {
              uid: payload });
        case SET_USERNAME:
            return Object.assign({}, state, {
              username: payload });
        case SET_USERS:
            return Object.assign({}, state, {
              allUsersData: payload,
             });
        case SET_USERINFO:
            return Object.assign({}, state, {
               userInfo: payload,
              });
        case SET_FOLLOWERS:
            return Object.assign({}, state, {
              followingIds: payload,
             });
        default:
            return state;
    }
}
