export const API_ROOT = "https://social-webapi.azurewebsites.net";

/*
    Набор url-ов для работы с предоставленным REST-API
 */

const SIGN_IN_URL = '/api/identity/signin';
const SIGN_UP_URL = '/api/identity/signup';

const GET_ME_URL = '/api/users/me';
const PUT_ME_URL = '/api/users/me';
const PUT_ME_AVATAR_URL = '/api/users/me/photo';

const GET_USER_INFO = '/api/users/{userId}';
const GET_USERS = '/api/users';

const GET_USER_FOLLOWINGS = '/api/users/{userId}/followings';
const GET_USER_FOLLOWERS = '/api/users/{userId}/followers';

const GET_USER_FEED = '/api/users/{userId}/posts/feed';
const GET_USER_WALL = '/api/users/{userId}/posts/wall';

const SUBSCRIBE = '/api/users/me/followings/{userId}';
const UNSUBSCRIBE = '/api/users/me/followings/{userId}';

const ADD_POST = '/api/users/me/posts';
const ADD_POST_IMAGE = '/api/users/me/posts/{postId}/image';


/*
    Авторизация пользователя на сайте
        email - электронная почта пользователя
        password - пароль пользователя
    Возвращает Response
 */
export function signInUser(email, password) {
    return fetch(API_ROOT + SIGN_IN_URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
}

/*
    Регистрация пользователя на сайте
        email - электронная почта пользователя
        password - пароль пользователя
        userName - имя пользователя
        dateOfBirth - дата рождения пользователя
    Возвращает Response
 */
export function signUpUser(email, password, userName, dateOfBirth) {
    return fetch(API_ROOT + SIGN_UP_URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
            name: userName,
            birthday: dateOfBirth
        }),
    });
}

/*
    Получение информации об авторизованном пользователе
        token - API-токен пользователя (Bearer Token)
    Возвращает Response
 */
export function getUserInfo(token) {
    return fetch(API_ROOT + GET_ME_URL, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    });
}

/*
    Получение информации о пользователе по его ID
        id - ID интересующего нас пользователя
        token - API-токен пользователя (Bearer Token)
    Возвращает Response
 */
export function getUserInfoId(id, token) {
    return fetch(API_ROOT + GET_USER_INFO.replace('{userId}', String(id)), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    });
}

/*
    Получение полного списка зарегистрированных на сайте людей
        token - API-токен пользователя (Bearer Token)
    Возвращает Response
 */
export function getPeople(token) {
    return fetch(API_ROOT + GET_USERS, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    });
}

/*
    Получение списка подписок пользователя
        id - ID интересующего нас пользователя
        token - API-токен пользователя (Bearer Token)
    Возвращает Response
 */
export function getUserFollowings(id, token) {
    return fetch(API_ROOT + GET_USER_FOLLOWINGS.replace('{userId}', id), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    });
}

/*
    Получение списка подписчиков пользователя
        id - ID интересующего нас пользователя
        token - API-токен пользователя (Bearer Token)
    Возвращает Response
 */
export function getUserFollowers(id, token) {
    return fetch(API_ROOT + GET_USER_FOLLOWERS.replace('{userId}', id), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    });
}

/*
    Получение списка постов подписок пользователя
        id - ID интересующего нас пользователя
        token - API-токен пользователя (Bearer Token)
    Возвращает Response
 */
export function getFeed(id, token) {
    return fetch(API_ROOT + GET_USER_FEED.replace('{userId}', id), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: "Bearer " + token
        }
    });
}

/*
    Получение списка постов пользователя
        id - ID интересующего нас пользователя
        token - API-токен пользователя (Bearer Token)
    Возвращает Response
 */
export function getWall(id, token) {
    return fetch(API_ROOT + GET_USER_WALL.replace('{userId}', id), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    });
}

/*
    Подписка на пользователя
        id - ID интересующего нас пользователя
        token - API-токен пользователя (Bearer Token)
    Возвращает Response
 */
export function subscribe(id, token) {
    return fetch(API_ROOT + SUBSCRIBE.replace('{userId}', id), {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    });
}

/*
    Отписка от пользователя
        id - ID интересующего нас пользователя
        token - API-токен пользователя (Bearer Token)
    Возвращает Response
 */
export function unsubscribe(id, token) {
    return fetch(API_ROOT + UNSUBSCRIBE.replace('{userId}', id), {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    });
}

/*
    Добавление поста на сайт
        token - API-токен пользователя (Bearer Token)
        text - Текст создаваемого поста
    Возвращает Response
 */
export function addPost(token, text) {
    return fetch(API_ROOT + ADD_POST, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        },
        body: JSON.stringify({
            text: String(text)
        }),
    });
}

/*
    Добавление изображения к посту
        token - API-токен пользователя (Bearer Token)
        postId - ID поста, к которому добавляется изображение
        imageFile - Добавляемое изображение
    Возвращает Response
 */
export function addPostImage(token, postId, imageFile) {
    let formData = new FormData();
    formData.append('imageFile', imageFile);
    return fetch(API_ROOT + ADD_POST_IMAGE.replace('{postId}', postId), {
        method: 'PUT',
        headers: {
            Authorization: "Bearer " + token
        },
        body: formData
    });
}

/*
    Обновление данных пользователя
        token - API-токен пользователя (Bearer Token)
        name - Новое имя пользователя
        dateOfBirth - Новая дата рождения пользователя
        info - Новая информация о пользователе
    Возвращает Response
 */
export function editUserInfo(token, name, dateOfBirth, info) {
    return fetch(API_ROOT + PUT_ME_URL, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        },
        body: JSON.stringify({
            name: name,
            birthday: dateOfBirth,
            info: info
        }),
    });
}

/*
    Добавление изображения пользователя
        token - API-токен пользователя (Bearer Token)
        image - Добавляемое изображение
    Возвращает Response
 */
export function editUserAvatarInfo(token, image) {
    let formData = new FormData();
    formData.append("file", image);
    return fetch(API_ROOT + PUT_ME_AVATAR_URL, {
        method: 'PUT',
        headers: {
            Authorization: "Bearer " + token
        },
        body: formData,
    });
}