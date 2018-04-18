export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export const SUBSCRIBE = 'SUBSCRIBE';
export const UNSUBSCRIBE = 'UNSUBSCRIBE';
export const LOAD_SUBSCRIPTIONS = 'LOAD_SUBSCRIPTIONS';

/*
    Действие авторизации пользователя на сайте
        token - API-токен пользователя (Bearer Token)
        userId - Уникальный ID авторизованного пользователя
 */
export const signInAction = (token, userId) => {
    return {
        type: SIGN_IN,
        token,
        userId
    }
};

/*
    Действие деавторизации пользователя на сайте
 */
export const signOutAction = () => {
    return {
        type: SIGN_OUT,
    }
};

/*
    Действие подписки пользователя на другого пользователя
        userId - ID пользователя, на которого подписываемся
 */
export const subscribeAction = (userId) => {
    return {
        type: SUBSCRIBE,
        userId,
    }
};

/*
    Действие отписки пользователя от другого пользователя
        userId - ID пользователя, от которого отписываемся
 */
export const unsubscribeAction = (userId) => {
    return {
        type: UNSUBSCRIBE,
        userId
    }
};

/*
    Действие сохранения списка подписок с сайта
        usersIds - ID пользователей, на которых мы подписаны
    (Загрузка происходит в компоненте, это действие - сохранение данных)
 */
export const loadSubscriptionsAction = (usersIds) => {
    return {
        type: LOAD_SUBSCRIPTIONS,
        usersIds
    }
};
