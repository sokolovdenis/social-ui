import { SET_AUTH } from '../actions/actionTypes';

const initialState = [];

export default function authReducers(state = initialState, { type, payload }) {
    switch (type) {
        case SET_AUTH:
            return payload;
        default:
            return state;
    }
}
