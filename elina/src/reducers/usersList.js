import {
    FETCH_USERS_LIST
} from '../actions/actionTypes';

const initialState = {};

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case FETCH_USERS_LIST:
            return payload;
        default:
            return state;

    }
    return state;
};