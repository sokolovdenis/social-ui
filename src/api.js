import Axios from 'axios';
import Cookies from 'js-cookie';

let Api = {
  API_BASE: 'http://social-webapi.azurewebsites.net/api',
  ALT_AVATAR_LINK: 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-use-260nw-193292048.jpg'
}

Api.setAuthToken = function(token) {
  Cookies.set('auth-token', token);
};

Api.getAuthToken = function() {
  return Cookies.get('auth-token');
};

Api.removeAuthToken = function() {
  Cookies.remove('auth-token');
};

Api.getConfig = function() {
  return {
    headers: {
      'Authorization': 'bearer ' + Api.getAuthToken()
    }
  };
};

Api.post = function(path, body) {
  return Axios.post(Api.API_BASE + path, body,
    Api.getConfig());
};

Api.put = function(path, body) {
  return Axios.put(Api.API_BASE + path, body,
    Api.getConfig());
};

Api.get = function(path) {
  return Axios.get(Api.API_BASE + path,
    Api.getConfig());
};

Api.delete = function(path) {
  return Axios.delete(Api.API_BASE + path,
    Api.getConfig());
};

export default Api;
