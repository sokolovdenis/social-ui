import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import './App.css';
import Feed from './Feed.js';
import Header from './Header.js';
import Start from './Start';
import Profile from './Profile';
import EditProfile from './EditProfile';
import Users from './Users';
import Footer from './Footer';

const mapStateToProps = state => ({
    token: state.token
});

class App extends Component {

    render() {
        return (
            <main className="App">
                <Header />
                <Switch>
                    <Route exact path='/' render={() => (
                        this.props.token ? (
                            <Redirect to="/feed" />
                        ) : (<Start />)
                    )} />
                    <Route exact path='/feed' render={() => <Feed userId='1' type='feed' />} />
                    <Route exact path='/profile/:number' component={Profile} />
                    <Route exact path='/edit' component={EditProfile} />
                    <Route exact path='/users' component={Users} />
                </Switch>
                <Footer />
            </main>
        );
    }
}

export default withRouter(connect(mapStateToProps)(App));
