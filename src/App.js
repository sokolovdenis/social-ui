import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import Header from './header';
import Footer from './footer';

import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Settings from "./components/Settings";
import AddPostPage from "./components/AddPostPage";
import People from "./components/PeopleList";
import LogInContainer from "./components/LogIn";
import LogOut from "./components/LogOut";
import Register from "./components/Register";
import PageNotFound from "./components/PageNotFound";

import {getUserFollowings} from './api'
import {loadSubscriptionsAction} from "./actions";


class AppPresentation extends Component {
    render() {
        if (!this.props.isAuthenticated) {
            return (
                <Router>
                    <div className="wrapper">
                        <Header/>
                        <Switch>
                            <Route path="/log_in" component={LogInContainer}/>
                            <Route path="/register" component={Register}/>
                            <Route component={PageNotFound}/>
                        </Switch>
                        <Footer/>
                    </div>
                </Router>
            );
        }
        this.props.loadUserFollowings(this.props.userId, this.props.token);
        return (
            <Router>
                <div className="wrapper">
                    <Header/>
                    <Switch>
                        <Route path="/profile/:id" component={Profile}/>
                        <Route path="/add_post" component={AddPostPage}/>
                        <Route path="/feed" component={Feed}/>
                        <Route path="/settings" component={Settings}/>
                        <Route path="/people" component={People}/>
                        <Route path="/log_out" component={LogOut}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/log_in" component={LogInContainer}/>
                        <Route component={PageNotFound}/>
                    </Switch>
                    <Footer/>
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        userId: state.authentication.userId,
        token: state.authentication.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // Обновляем информацию о подписках пользователя
        // TODO: Возможно, следует делать это при авторизации пользователя?
        loadUserFollowings: (userId, token) => {
            getUserFollowings(userId, token).then((response) => {
                response.json().then((json) => {
                    let userIds = json.map((user) => {
                        return user.id
                    });
                    dispatch(loadSubscriptionsAction(userIds))
                });
            })
        }
    }
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppPresentation);

export default AppContainer;