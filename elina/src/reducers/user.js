import {
    FETCH_USER_DATA
} from '../actions/actionTypes';

const initialState = {};

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case FETCH_USER_DATA:
            return  Object.assign({}, state, payload);
        default:
            return state;

    }
    return state;
};