import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app';
import RegistrationForm from './registration';
import LoginForm from './login';
import ProfileForm from './profile';
import ProfileListForm from './profilelist';
import ProfileEditForm from './profileedit';
import FeedForm from './feed';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={RegistrationForm} />
    <Route path='profile/:id' component={ProfileForm} />
    <Route path='feed' component={FeedForm} />
    <Route path='profile' component={ProfileListForm} />
    <Route path='editprofile' component={ProfileEditForm} />
    <Route path='login' component={LoginForm} />
    <Route path='*' component={RegistrationForm} />
  </Route>
);
