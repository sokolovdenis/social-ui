import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import './App.css';
import Feed from './Feed.js';
import Header from './Header.js';
import Start from './Start';
import Profile from './Profile';
import Users from './Users';
import Footer from './Footer';

class App extends Component {

    render() {
        return (
            <main className="App">
                <Header />
                <Switch>
                    <Route exact path='/' component={Start} />
                    <Route exact path='/feed' render={() => <Feed userId='1' type='feed' />} />
                    <Route path='/profile/:number' component={Profile} />
                    <Route path='/users' component={Users} />
                </Switch>
                <Footer />
            </main>
        );
    }
}

export default App;
