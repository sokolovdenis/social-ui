class Api {

    static getBaseUrl() {
        return 'http://social-webapi.azurewebsites.net/api';
    }

    static getToken() {
        return sessionStorage.getItem('token');
    }

    static setToken(value) {
        sessionStorage.setItem('token', value);
    }

    static httpPost(endpoint, body) {
        let options = {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch(this.getBaseUrl() + endpoint, options)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response.statusText);
                }
            });
    }

    static login(credentials) {
        return this.httpPost('/identity/signin', credentials)
            .then(function (result) {
                console.log(result.token);
                Api.setToken(result.token);
            });
    }

    static signup(data) {
        return this.httpPost('/identity/signup', data)
            .then(function (result) {
                console.log(result.token);
                Api.setToken(result.token);
            });
    }
}