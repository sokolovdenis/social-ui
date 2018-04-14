class Api {

    static get statusCodes() {
        return {
            Unknown: { code: -1, dscr: 'Unknown error' },
            Ok: { code: 0, dscr: 'Ok' },
            WrongCredentials: { code: 1, dscr: 'Wrong username or password' },
            WrongParameters: { code: 2, dscr: 'One or more fields are incorrect' },
            UserAlreadyExists: { code: 3, dscr: 'User with specified email already exists'},
        }
    }

    static get baseUrl() {
        return 'http://social-webapi.azurewebsites.net/api';
    }

    static getToken() {
        return sessionStorage.getItem('token');
    }

    static setToken(value) {
        sessionStorage.setItem('token', value);
    }

    static httpGet(endpoint, authorize = false) {
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (authorize) {
            const token = this.getToken();
            if (token == null) {
                throw 'No access token';
            }
            options.headers['Authorization'] = 'Bearer ' + this.getToken();
        }

        return fetch(this.baseUrl + endpoint, options)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response.status);
                }
            });
    }

    static httpPost(endpoint, body, authorize = false) {
        let options = {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (authorize) {
            const token = this.getToken();
            if (token == null) {
                throw 'No access token';
            }
            options.headers['Authorization'] = 'Bearer ' + this.getToken();
        }

        return fetch(this.baseUrl + endpoint, options)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response.status);
                }
            });
    }

    static signIn(credentials) {
        return this.httpPost('/identity/signin', credentials)
            .then(function (result) {
                console.log(result.token);
                Api.setToken(result.token);
            }).catch(function (code) {
                if (code == 400) {
                    return Promise.reject(Api.statusCodes.WrongCredentials)
                } else {
                    return Promise.reject(Api.statusCodes.Unknown);
                }
            });
    }

    static signUp(data) {
        return this.httpPost('/identity/signup', data)
            .then(function (result) {
                console.log(result.token);
                Api.setToken(result.token);
            }).catch(function (code) {
                if (code == 400) {
                    return Promise.reject(Api.statusCodes.WrongParameters)
                } if (code == 409) {
                    return Promise.reject(Api.statusCodes.UserAlreadyExists)
                } else {
                    return Promise.reject(Api.statusCodes.Unknown);
                }
            });
    }

    static getMyselfInfo() {
        return this.httpGet('/users/me', true);
    }
}