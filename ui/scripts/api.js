class Api {

    static get statusCodes() {
        return {
            Unknown: -1,
            Ok: 0,
            WrongCredentials: 1,
            WrongParameters: 2,
            UserAlreadyExists: 3,
            AuthenticationFailed: 4,
            NoAccessToken: 5
        }
    }

    static description(code) {
        let descriptions = [];
        descriptions[this.statusCodes.Ok] = 'Ok';
        switch (code) {
            case this.statusCodes.Unknown:
                return 'Unknown';
            case this.statusCodes.Ok:
                return 'Ok';
            case this.statusCodes.WrongCredentials:
                return 'Wrong username or password';
            case this.statusCodes.WrongParameters:
                return 'One or more fields are incorrect';
            case this.statusCodes.UserAlreadyExists:
                return 'User with specified email already exists';
            case this.statusCodes.AuthenticationFailed:
                return 'Authentication failed';
            case this.statusCodes.NoAccessToken:
                return 'No access token'
            default:
                throw new Error('Undefined status code');
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
                throw new Error('Assertion failed: No access token');
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
                throw new Error('Assertion failed: No access token');
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
                } else if (code == 409) {
                    return Promise.reject(Api.statusCodes.UserAlreadyExists)
                } else {
                    return Promise.reject(Api.statusCodes.Unknown);
                }
            });
    }

    static getMyselfInfo() {
        if (!this.getToken()) {
            return Promise.reject(Api.statusCodes.NoAccessToken);
        }
        return this.httpGet('/users/me', true)
            .catch(function (code) {
                if (code == 401) {
                    return Promise.reject(Api.statusCodes.AuthenticationFailed);
                } else if (code == 401) {
                    throw new Error('Assert: failed to get myself info by access token');
                } else {
                    return Promise.reject(Api.statusCodes.Unknown);
                }
            });
    }
}