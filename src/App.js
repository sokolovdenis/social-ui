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

import './global.css';

const mapStateToProps = state => ({
    token: state.token,
    currentUserId: state.currentUserId,
});

class App extends Component {

    render() {
        return (
            <div className="app">
                <Header />
                <main className="content">
                    <Switch>
                        <Route exact path='/' render={() => (
                            this.props.token ? (
                                <Redirect to="/feed" />
                            ) : (<Start />)
                        )} />
                        <Route exact path='/feed' render={() =>
                            <div className="feed">
                                <Feed userId={this.props.currentUserId} type='feed' />
                            </div>
                        } />
                        <Route exact path='/profile/:number' component={Profile} />
                        <Route exact path='/edit' component={EditProfile} />
                        <Route exact path='/users' component={Users} />
                    </Switch>
                </main>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(App));
