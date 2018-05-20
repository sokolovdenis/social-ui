import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app';
import RegistrationForm from './registration';
import LoginForm from './login';
import ProfileForm from './profile';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={RegistrationForm} />
    <Route path='profile' component={ProfileForm} />
    <Route path='login' component={LoginForm} />
    <Route path='*' component={RegistrationForm} />
  </Route>
);
