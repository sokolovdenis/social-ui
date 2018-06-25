import Axios from 'axios';
import Cookies from 'js-cookie';

let Api = {
    API_URL: 'http://social-webapi.azurewebsites.net/api',

    setToken: function(token) {
        Cookies.set('token', token);
    },

    getToken: function() {
        return Cookies.get('token');
    },

    getConfig: function() {
        return {
            headers: {
                'Authorization': 'Bearer ' + Api.getToken()
            }
        }
    },

    post: function(path, body) {
        return Axios.post(Api.API_URL + path, body, Api.getConfig());
    },

    get: function(path) {
        return Axios.get(Api.API_URL + path, Api.getConfig());
    }
}

export default Api;