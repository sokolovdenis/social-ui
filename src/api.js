import Axios from 'axios';

let Api = {

  setAuthToken: function(token) {
    window.compactSocial.apiConfig.headers = {
      'Authorization': 'bearer ' + token
    };
  },

  post: function(path, body) {
    return Axios.post(window.compactSocial.API_BASE + path, body,
      window.compactSocial.apiConfig);
  },

  get: function(path) {
    return Axios.get(window.compactSocial.API_BASE + path,
      window.compactSocial.apiConfig);
  }
}

export default Api;