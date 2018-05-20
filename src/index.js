import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './style.css'

window.compactSocial = {
  API_BASE: 'http://social-webapi.azurewebsites.net/api',
  apiConfig: {},
  userId: false
};

render(<Router history={browserHistory} routes={routes} />,
  document.getElementById('root'));
