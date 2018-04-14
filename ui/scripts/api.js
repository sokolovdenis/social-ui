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

    static login(credentials) {
        let options = {
            method: 'POST',
            body: credentials,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch(this.getBaseUrl() + '/identity/signin', options)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (result) {
                        console.log(result.token);
                        setToken(result.token);
                    });
                }
            });
    }

    static register(data, callback) {
        let options = {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch(this.getBaseUrl() + '/identity/signup', options)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (result) {
                        console.log(result.token);
                        setToken(result.token);
                        callback();
                    });
                }
            });
    }
}