import urljoin from 'url-join'

const API_BASE = "https://social-webapi.azurewebsites.net/api/";

const IDENTITY_BASE = urljoin(API_BASE, 'IDENTITY');
const USERS_BASE =  urljoin(API_BASE, 'users');

export function signIn(email, password) {
    return fetch(urljoin(IDENTITY_BASE, 'signin'), {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    }).then(response => {
        return response.json()
    }).then(json => {
        return json.token
    })
}

export function signUp(email, password, username, birthDate) {
    return fetch(urljoin(IDENTITY_BASE, 'signup'), {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
            name: username,
            birthday: birthDate
        }),
    }).then(response => {
        return response.json()
    }).then(json => {
        return json.token
    });
}

export function getMe(token) {
    return fetch(urljoin(USERS_BASE, 'me'), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    }).then(response => {
        return response.json()
    }).then(json => {
        return json.id
    });
}

export function getUser(userId, token) {
    return fetch(urljoin(USERS_BASE, userId.toString()), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    }).then(response => {
        return response.json();
    })
}

export function getUsers(token) {
    return fetch(USERS_BASE, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    }).then(response => {
        return response.json()
    })
}

export function getFollowings(userId, token) {
    return fetch(urljoin(USERS_BASE, userId.toString(), 'followings'), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    }).then(response => {
        return response.json()
    })
}

export function getFollowers(userId, token) {
    return fetch(urljoin(USERS_BASE, userId.toString(), 'followers'), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    }).then(response => {
        return response.json()
    })
}

export function getFeed(userId, token) {
    return fetch(urljoin(USERS_BASE, userId.toString(), 'posts', 'feed'), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: "Bearer " + token
        }
    }).then(response => {
        return response.json()
    });
}

export function getWall(userId, token) {
    return fetch(urljoin(USERS_BASE, userId.toString(), 'posts', 'wall'), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    }).then(response => {
        return response.json()
    })
}

export function subscribe(userId, token) {
    return fetch(urljoin(USERS_BASE, 'me', 'followings', userId.toString()), {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    }).then(response => {
        return response
    });
}

export function unsubscribe(userId, token) {
    return fetch(urljoin(USERS_BASE, 'me', 'followings', userId.toString()), {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        }
    }).then(response => {
        return response
    });
}

export function addPost(token, text) {
    return fetch(urljoin(USERS_BASE, 'me', 'posts'), {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        },
        body: JSON.stringify({
            text: String(text)
        }),
    }).then(response => {
        return response.json()
    });
}

export function addPostImage(token, postuserId, imageFile) {
    let formData = new FormData();
    formData.append('imageFile', imageFile);
    return fetch(urljoin(USERS_BASE, 'me', 'posts', postuserId.toString(), 'image'), {
        method: 'PUT',
        headers: {
            Authorization: "Bearer " + token
        },
        body: formData
    }).then(response => {
        return response.json()
    });
}

export function editUserInfo(token, name, birthDate, info) {
    return fetch(urljoin(USERS_BASE, 'me'), {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        },
        body: JSON.stringify({
            name: name,
            birthday: birthDate,
            info: info
        }),
    }).then(response => {
        return response.json()
    });
}

export function editUserAvatar(token, image) {
    let formData = new FormData();
    formData.append("file", image);
    return fetch(urljoin(USERS_BASE, 'me', 'photo'), {
        method: 'PUT',
        headers: {
            Authorization: "Bearer " + token
        },
        body: formData,
    }).then(response => {
        return response.json()
    });
}