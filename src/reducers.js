import {combineReducers} from 'redux'

import {SIGN_IN, SIGN_OUT, SUBSCRIBE, UNSUBSCRIBE, LOAD_SUBS} from './actions'

function authentication(state = {is_authenticated: false, token: null, user_id: null, rememberme: null}, action) {
    switch (action.type) {
        case SIGN_IN:
            return {
                is_authenticated: true,
                token: action.token,
                user_id: action.user_id,
                rememberme: action.rememberme
            };
        case SIGN_OUT:
            return {
                is_authenticated: false,
                token: null,
                user_id: null,
                rememberme: state.rememberme
            };
        default:
            return state;
    }
}

function followings(state = [], action) {
    switch (action.type) {
        case SUBSCRIBE:
            return [...state, action.user_id];
        case UNSUBSCRIBE:
            return state.filter((user_id) => user_id !== action.user_id);
        case LOAD_SUBS:
            return action.user_id_list;
        default:
            return state;
    }
}

const app_store = combineReducers({
    authentication,
    followings
});

export default app_store;