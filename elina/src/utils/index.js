const API_URL = 'http://social-webapi.azurewebsites.net/api/';

export const setSelfFollowings = (token, id) => {
    return fetch(API_URL + 'users/' + 'me/followings/' + id , {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then((res) => {
        console.log(res);
    });
};

export const setSelfUnfollowings = (token, id) => {
    return fetch(API_URL + 'users/' + 'me/followings/' + id , {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then((res) => {
        console.log(res);
    });
};

export const sendPost = (token, text, img) => {
    return fetch('http://social-webapi.azurewebsites.net/api/users/me/posts/', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'content-type': 'application/json'
        },
        body: JSON.stringify({"text": text}),
    })
        .then(res => res.json())
        .then(data => {
            if (img) {
                sendPhoto(token, data.id, img);
            } else {
                return data;
            }

            return data;
        })
};

export const sendPhoto = (token, id, img) => {

    let formData = new FormData();
    formData.append('imageFile', img);

    return fetch('http://social-webapi.azurewebsites.net/api/users/me/posts/' + id + '/image', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        body: formData,
    })
        .then(res => res.json())
        .then(data => data)
};