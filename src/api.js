export const API_ROOT = "https://social-webapi.azurewebsites.net";
const SIGN_IN = '/api/identity/signin';
const SIGN_UP = '/api/identity/signup';

const USERS = '/api/users';
const PROFILE = '/api/users/{userId}';

const FOLLOWINGS = '/api/users/{userId}/followings';
const FOLLOWERS = '/api/users/{userId}/followers';

const FEED = '/api/users/{userId}/posts/feed';
const WALL = '/api/users/{userId}/posts/wall';

const GET_ME_URL = '/api/users/me';

export function signInUser(email, password) {
    return fetch(API_ROOT + SIGN_IN, {
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

export function signUpUser(email, password, userName, dateOfBirth) {
    return fetch(API_ROOT + SIGN_UP, {
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

export function getUserInfoId(id, token) {
    return fetch(API_ROOT + PROFILE.replace('{userId}', String(id)), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    });
}

export function getPeople(token) {
    return fetch(API_ROOT + USERS, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    });
}

export function getUserFollowings(id, token) {
    return fetch(API_ROOT + FOLLOWINGS.replace('{userId}', id), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    });
}

export function getUserFollowers(id, token) {
    return fetch(API_ROOT + FOLLOWERS.replace('{userId}', id), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    });
}

export function getFeed(id, token) {
    return fetch(API_ROOT + FEED.replace('{userId}', id), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: "Bearer " + token
        }
    });
}

export function getWall(id, token) {
    return fetch(API_ROOT + WALL.replace('{userId}', id), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    });
}