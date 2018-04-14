class Api {

    static get statusCodes() {
        return {
            Unknown: -1,
            Ok: 0,
            WrongCredentials: 1,
            WrongParameters: 2,
            UserAlreadyExists: 3,
            AuthenticationFailed: 4,
            NoAccessToken: 5,
            NotFound: 6,
            AlreadyFollow: 7
        }
    }

    static description(code) {
        switch (code) {
            case Api.statusCodes.Unknown:
                return 'Unknown';
            case Api.statusCodes.Ok:
                return 'Ok';
            case Api.statusCodes.WrongCredentials:
                return 'Wrong username or password';
            case Api.statusCodes.WrongParameters:
                return 'One or more fields are incorrect';
            case Api.statusCodes.UserAlreadyExists:
                return 'User with specified email already exists';
            case Api.statusCodes.AuthenticationFailed:
                return 'Authentication failed';
            case Api.statusCodes.NoAccessToken:
                return 'No access token';
            case Api.statusCodes.NotFound:
                return 'Resource is not found';
            default:
                throw new Error('Undefined status code: ' + code);
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

    static defaultErrorHandling(code) {
        if (code == 401) {
            return Promise.reject(Api.statusCodes.AuthenticationFailed);
        } if (code == 404) {
            return Promise.reject(Api.statusCodes.NotFound);
        } else {
            return Promise.reject(Api.statusCodes.Unknown);
        }
    }

    static httpMethod(endpoint, method, authorize = false, body = null) {
        let options = {
            method: method,
            body: body,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (authorize) {
            const token = Api.getToken();
            if (token == null) {
                throw new Error('Assertion failed: No access token');
            }
            options.headers['Authorization'] = 'Bearer ' + Api.getToken();
        }

        return fetch(Api.baseUrl + endpoint, options)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response.status);
                }
            });
    }

    static httpGet(endpoint, authorize = false) {
        return Api.httpMethod(endpoint, 'GET', authorize);
    }

    static httpDelete(endpoint, authorize = false) {
        return Api.httpMethod(endpoint, 'DELETE', authorize);
    }

    static httpPut(endpoint, body, authorize = false) {
        return Api.httpMethod(endpoint, 'PUT', authorize, body);
    }

    static httpPost(endpoint, body, authorize = false) {
        return Api.httpMethod(endpoint, 'POST', authorize, body);
    }

    static signIn(credentials) {
        return Api.httpPost('/identity/signin', credentials)
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
        return Api.httpPost('/identity/signup', data)
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

    static getMyself() {
        if (!Api.getToken()) {
            return Promise.reject(Api.statusCodes.NoAccessToken);
        }
        return Api.httpGet('/users/me', true)
            .catch(function (code) {
                if (code == 401) {
                    return Promise.reject(Api.statusCodes.AuthenticationFailed);
                } else if (code == 404) {
                    throw new Error('Assert: failed to get myself info by access token');
                } else {
                    return Promise.reject(Api.statusCodes.Unknown);
                }
            });
    }

    static getUser(id) {
        if (!Api.getToken()) {
            // todo: try dry?
            return Promise.reject(Api.statusCodes.NoAccessToken);
        }
        return Api.httpGet(`/users/${id}`, true)
            .catch(Api.defaultErrorHandling);
    }

    static getAllUsers() {
        if (!Api.getToken()) {
            return Promise.reject(Api.statusCodes.NoAccessToken);
        }
        return Api.httpGet('/users', true)
            .catch(function (code) {
                if (code == 401) {
                    return Promise.reject(Api.statusCodes.AuthenticationFailed);
                } else {
                    return Promise.reject(Api.statusCodes.Unknown);
                }
            });
    }

    static getUsersFollowings(id) {
        if (!Api.getToken()) {
            return Promise.reject(Api.statusCodes.NoAccessToken);
        }
        return Api.httpGet(`/users/${id}/followings`, true)
            .catch(Api.defaultErrorHandling);
    }

    static getUsersFollowers(id) {
        if (!Api.getToken()) {
            return Promise.reject(Api.statusCodes.NoAccessToken);
        }
        return Api.httpGet(`/users/${id}/followers`, true)
            .catch(Api.defaultErrorHandling);
    }

    static getUsersFollowings(id) {
        if (!Api.getToken()) {
            return Promise.reject(Api.statusCodes.NoAccessToken);
        }
        return Api.httpGet(`/users/${id}/followings`, true)
            .catch(Api.defaultErrorHandling);
    }

    static follow(id) {
        if (!Api.getToken()) {
            return Promise.reject(Api.statusCodes.NoAccessToken);
        }
        return Api.httpPost(`/users/me/followings/${id}`, null, true)
            .catch(function (code) {
                if (code == 404) {
                    return Promise.reject(Api.statusCodes.NotFound);
                } if (code == 409) {
                    return Promise.reject(Api.statusCodes.AlreadyFollow);
                } else {
                    return Promise.reject(Api.statusCodes.Unknown);
                }
            });
    }

    static unfollow(id) {
        if (!Api.getToken()) {
            return Promise.reject(Api.statusCodes.NoAccessToken);
        }
        return Api.httpDelete(`/users/me/followings/${id}`, true)
            .catch(function (code) {
                if (code == 404) {
                    return Promise.reject(Api.statusCodes.NotFound);
                } else {
                    return Promise.reject(Api.statusCodes.Unknown);
                }
            });
    }

    static getUserPosts(id, skip, count = 20) {
        if (!Api.getToken()) {
            return Promise.reject(Api.statusCodes.NoAccessToken);
        }
        return Api.httpGet(`/users/${id}/posts/wall`, true)
            .catch(Api.defaultErrorHandling);
    }

    static getUserPosts(id, skip, count = 20) {
        if (!Api.getToken()) {
            return Promise.reject(Api.statusCodes.NoAccessToken);
        }
        return Api.httpGet(`/users/${id}/posts/wall`, true)
            .catch(Api.defaultErrorHandling);
    }

    static getUserFeed(id, skip, count = 20) {
        if (!Api.getToken()) {
            return Promise.reject(Api.statusCodes.NoAccessToken);
        }
        return Api.httpGet(`/users/${id}/posts/feed`, true)
            .catch(Api.defaultErrorHandling);
    }

    static editMyself(value) {
        if (typeof(value) == 'object') {
            value = JSON.stringify(value);
        }
        if (!Api.getToken()) {
            return Promise.reject(Api.statusCodes.NoAccessToken);
        }
        return Api.httpPut(`/users/me`, value, true)
            .catch(function (code) {
                if (code == 400) {
                    return Api.statusCodes.WrongParameters;
                }
                return Api.defaultErrorHandling(code);
            });
    }

    // todo: not implemented: delete myself
    // todo: not implemented: update image

    static createPost(text) {
        if (!Api.getToken()) {
            return Promise.reject(Api.statusCodes.NoAccessToken);
        }
        return Api.httpPost(`/users/me/posts?Text=${text}`, null, true)
            .catch(function (code) {
                if (code == 400) {
                    return Api.statusCodes.WrongParameters;
                }
                return Api.defaultErrorHandling(code);
            });
    }

    // todo: not implemented: attach image


}