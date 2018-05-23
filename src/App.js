import React, { Component } from 'react';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers';
import Header from './Header.js';
import Routing from  './Routing'

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk)
));

class App extends Component {
  
  render() {
    return (        
    <Provider store={store}>
    <Router>
      <div>
        <Header/>
        <Switch>
          <Routing/>
        </Switch>
      </div>
    </Router>
    </Provider>
    );
    
  }
}

export default App;
