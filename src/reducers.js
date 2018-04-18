import {combineReducers} from 'redux'

import {SIGN_IN, SIGN_OUT, SUBSCRIBE, UNSUBSCRIBE, LOAD_SUBSCRIPTIONS} from './actions'

/*
    Информация об авторизации пользователя
        isAuthenticated - флаг, авторизован ли пользователь на сайте
        token - API-токен пользователя (Bearer Token)
        userId - Уникальный ID авторизованного пользователя
    Действия:
        SIGN_IN - авторизовать пользователя
        SIGN_OUT - деавторизоваться пользователя
 */
function authentication(state = {isAuthenticated: false, token: null, userId: null}, action) {
    switch (action.type) {
        case SIGN_IN:
            return {
                isAuthenticated: true,
                token: action.token,
                userId: action.userId
            };
        case SIGN_OUT:
            return {
                isAuthenticated: false,
                token: null,
                userId: null
            };
        default:
            return state;
    }
}

/*
    Информация о подписках пользователя
        state - список ID пользователей, на которых подписан авторизованный пользователь
    Действия:
        SUBSCRIBE - подписаться на конкретного пользователя
        UNSUBSCRIBE - отписаться от конкретного пользователя
        LOAD_SUBSCRIPTIONS - загрузить список подписок пользователя с сервера
 */
function followings(state = [], action) {
    switch (action.type) {
        case SUBSCRIBE:
            return [
                ...state,
                action.userId,
            ];
        case UNSUBSCRIBE:
            return state.filter((userId) => userId !== action.userId);
        case LOAD_SUBSCRIPTIONS:
            return action.usersIds;
        default:
            return state;
    }
}

const friendsAppStore = combineReducers({
    authentication,
    followings
});

export default friendsAppStore;