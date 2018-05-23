import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import users from './users';
import usersList from './usersList';

const reducers = combineReducers({
    routing: routerReducer,
    user,
    users,
    usersList
});

export default reducers;
