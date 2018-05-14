export const BASE_URL = "https://social-webapi.azurewebsites.net";
const SIGN_IN = '/api/identity/signin';
const SIGN_UP = '/api/identity/signup';
const SUBSCRIBE = '/api/users/me/followings/{user_id}';
const UNSUBSCRIBE = '/api/users/me/followings/{user_id}';
const PROFILE = '/api/users/me';
const POST_AVATAR = '/api/users/me/photo';
const USER = '/api/users/{user_id}';
const GET_USERS = '/api/users';
const GET_FEED = '/api/users/{user_id}/posts/feed';
const GET_WALL = '/api/users/{user_id}/posts/wall';
const GET_FOLLOWINGS = '/api/users/{user_id}/followings';
const GET_FOLLOWERS = '/api/users/{user_id}/followers';
const ADD_POST = '/api/users/me/posts';
const ATTACH_IMAGE = '/api/users/me/posts/{post_id}/image';


export function sign_in(email, password) {
    return fetch(BASE_URL + SIGN_IN, {
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

export function sign_up(email, password, user_name, date_of_birth) {
    return fetch(BASE_URL + SIGN_UP, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
            name: user_name,
            birthday: date_of_birth
        }),
    });
}

export function subscribe(id, token) {
    return fetch(BASE_URL + SUBSCRIBE.replace('{user_id}', id), {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    });
}

export function unsubscribe(id, token) {
    return fetch(BASE_URL + UNSUBSCRIBE.replace('{user_id}', id), {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    });
}

export function get_profile(token) {
    return fetch(BASE_URL + PROFILE, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    });
}

export function post_profile(token, name, date_of_birth, info) {
    return fetch(BASE_URL + PROFILE, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        },
        body: JSON.stringify({
            name: name,
            birthday: date_of_birth,
            info: info
        }),
    });
}

export function post_avatar(token, image) {
    let form_data = new FormData();
    form_data.append("file", image);
    return fetch(BASE_URL + POST_AVATAR, {
        method: 'PUT',
        headers: {
            Authorization: "Bearer " + token
        },
        body: form_data,
    });
}

export function get_user(id, token) {
    return fetch(BASE_URL + USER.replace('{user_id}', String(id)), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    });
}

export function get_users(token) {
    return fetch(BASE_URL + GET_USERS, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    });
}

export function get_followings(id, token) {
    return fetch(BASE_URL + GET_FOLLOWINGS.replace('{user_id}', id), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    });
}

export function get_followers(id, token) {
    return fetch(BASE_URL + GET_FOLLOWERS.replace('{user_id}', id), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    });
}

export function get_feed(id, token) {
    return fetch(BASE_URL + GET_FEED.replace('{user_id}', id), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: "Bearer " + token
        }
    });
}

export function get_wall(id, token) {
    return fetch(BASE_URL + GET_WALL.replace('{user_id}', id), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    });
}

export function add_post(token, text) {
    return fetch(BASE_URL + ADD_POST, {
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

export function attach_image(token, post_id, image) {
    let form_data = new FormData();
    form_data.append('imageFile', image);
    return fetch(BASE_URL + ATTACH_IMAGE.replace('{post_id}', post_id), {
        method: 'PUT',
        headers: {
            Authorization: "Bearer " + token
        },
        body: form_data
    });
}