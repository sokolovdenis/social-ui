import { SET_FEED, SET_WALL } from '../actions/actionTypes';

const initialState = [];

export default function feedReducers(state = initialState, { type, payload }) {
    switch (type) {
        case SET_FEED:
            return Object.assign({}, state, {
              feed: payload });
        case SET_WALL:
              return Object.assign({}, state, {
                wall: payload });
        default:
            return state;
    }
}
