import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import AppContainer from './App';
import friendsAppStore from './reducers'

import './index.css';

const store = createStore(friendsAppStore);

ReactDOM.render(
    <Provider store={store}>
        <AppContainer/>
    </Provider>,
    document.getElementById('root')
);