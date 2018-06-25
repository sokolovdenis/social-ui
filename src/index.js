import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './App'
import Register from './Register'
import Login from './Login'
import Profile from './Profile'
import './index.css'

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route path='/' component={App} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/profile/:id' component={Profile} />
            <Route path='/profile' component={Login} />
        </div>
    </BrowserRouter>,
    document.getElementById('root')
)