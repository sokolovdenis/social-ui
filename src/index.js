import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import configureStore from './configureStore'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
const [token, userId] = [cookies.get('token'), cookies.get('userId')]
const store = configureStore({ auth: { token: token, id: userId, followings: [] } });

ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>

), document.getElementById('root'));
registerServiceWorker();
