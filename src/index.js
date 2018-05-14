import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import { applyMiddleware, createStore } from "redux"
import { save, load } from "redux-localstorage-simple"
import './index.css';
import AppObject from './components/App';
import registerServiceWorker from './registerServiceWorker';
import app_store from './reducers'

let createStoreWithMiddleware = applyMiddleware(
    save()
)(createStore);

let store = createStoreWithMiddleware(
    app_store,
    load()
);

ReactDOM.render(
    <Provider store={store}><AppObject/></Provider>, document.getElementById('root')
);
registerServiceWorker();
