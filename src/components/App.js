import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {get_followings} from '../webapi'
import {load_subs_action} from "../actions";
import Header from './header';
import SignIn from "./signin";
import SignUp from "./signup"
import SignOut from "./signout";
import Profile from "./profile";
import People from "./people";
import AddPost from "./add_post";
import Feed from "./feed";
import NotFound from "./404"
import Settings from "./settings"

import './App.css';

class AppComponent extends Component {
    render() {
        if (!this.props.is_authenticated) {
            return (
                <BrowserRouter>
                    <div className="wrapper">
                        <Header/>
                        <Switch>
                            <Route path="/sign_in" component={SignIn}/>
                            <Route path="/sign_up" component={SignUp}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            );
        }
        this.props.load_followings(this.props.user_id, this.props.token);
        return (
            <BrowserRouter>
                <div className="wrapper">
                    <Header/>
                    <Switch>
                        <Route path="/profile/:id" component={Profile}/>
                        <Route path="/people" component={People}/>
                        <Route path="/sign_in" component={SignIn}/>
                        <Route path="/sign_out" component={SignOut}/>
                        <Route path="/add_post" component={AddPost}/>
                        <Route path="/feed" component={Feed}/>
                        <Route path="/settings" component={Settings}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

function mapStateToProps(state) {
    return {
        is_authenticated: state.authentication.is_authenticated,
        user_id: state.authentication.user_id,
        token: state.authentication.token,
        rememberme: state.authentication.rememberme
    }
}

function mapDispatchToProps(dispatch) {
    return {
        load_followings: (user_id, token) => {
            get_followings(user_id, token).then((response) => {
                response.json().then((json) => {
                    let user_id_list = json.map((user) => {
                        return user.id
                    });
                    dispatch(load_subs_action(user_id_list))
                });
            })
        }
    }
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppComponent);

export default AppContainer;
