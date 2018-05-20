import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './style.css'

window.compactSocial = {
  API_BASE: 'http://social-webapi.azurewebsites.net/api',
  apiConfig: {},
  pages: {
    REGISTRATION: 1,
    LOGIN: 2,
    PROFILE: 3
  },

  currentPage: 1
};

render(<Router history={browserHistory} routes={routes} />,
  document.getElementById('root'));
