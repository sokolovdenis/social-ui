import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth'
import user from './user'
import feed from './feed'

const reducer = combineReducers({
    routing: routerReducer,
    auth,
    user,
    feed,
});

export default reducer;
