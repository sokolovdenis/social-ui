import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { CookiesProvider } from 'react-cookie';

import reducers from './reducers';
import Sidebar from './containers/sidebar';
import Login from './containers/login';
import Registration from './containers/registration';
import User from './containers/user';
import Users from './containers/users';

import './styles.css';

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk)
));


ReactDOM.render((
    <Provider store={store}>
        <CookiesProvider>
            <Router>
                <div>
                    <Sidebar/>
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/registration' component={Registration} />
                        <Route path='/user/:id' component={User} />
                        <Route path='/users' component={Users} />
                        <Route exact path='/*' component={Login} />
                    </Switch>
                </div>
            </Router>
        </CookiesProvider>
    </Provider>
), document.getElementById('root'));
