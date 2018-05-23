import {
    FETCH_USERS_DATA
} from '../actions/actionTypes';

const initialState = {};

export default (state = initialState, {type, payload}) => {
    const newState = Object.assign({}, state);

    if (payload) {
        newState[payload.id] = Object.assign({}, newState[payload.id], payload.data);
    }

    switch (type) {
        case FETCH_USERS_DATA:
            return newState;
        default:
            return state;

    }
    return state;
};