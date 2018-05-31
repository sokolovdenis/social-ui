import React, {Component} from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import SignIn from './components/SignInForm'
import SignUp from './components/SignUpForm'
import SignOut from './components/SignOutForm'
import Profile from "./components/Profile"
import PageNotFound from "./components/PageNotFound"

import Header from "./components/Header"

import {getUserInfo, signInUser, signUpUser} from './api'

class App extends Component {
    state = {
            isAuth: false,
            token: undefined,
            userId: undefined,
            };

    render() {
        if (!this.state.isAuth) {
            console.log('here');
            return (
                <Router>
                    <div className="wrapper">
                        <Header isAuth={this.state.isAuth} userId={this.state.userId}/>
                        <Switch>
                            <Route path="/sign_in" render={(props) => <SignIn SignInCallback={this.SignInCallback} userId={this.state.userId}
                                                                              isAuth={this.state.isAuth} {...props}/>}/>
                            <Route path="/sign_up" render={(props) => <SignUp SignUpCallback={this.SignUpCallback} userId={this.state.userId}
                                                                              isAuth={this.state.isAuth} {...props}/>}/>
                            <Route render={(props) => <PageNotFound isAuth={this.state.isAuth} {...props}/>}/>
                        </Switch>

                    </div>
                </Router>
            )
        }
        console.log('there');
        return (
            <Router>
                <div className="wrapper">
                    <Header isAuth={this.state.isAuth} userId={this.state.userId}/>
                    <Switch>
                        <Route path="/user_profile/:id" render={(props) => <Profile token={this.state.token}
                                                                               userId={this.state.userId} {...props}/>}/>

                        <Route path="/sign_in" render={(props) => <SignIn SignInCallback={this.SignInCallback} userId={this.state.userId}
                                                                          isAuth={this.state.isAuth} {...props}/>}/>
                        <Route path="/sign_up" render={(props) => <SignUp SignUpCallback={this.SignUpCallback} userId={this.state.userId}
                                                                          isAuth={this.state.isAuth} {...props}/>}/>
                        <Route path="/sign_out" render={(props) => <SignOut SignOutCallback={this.SignOutCallback} {...props}/>}/>

                        <Route render={(props) => <PageNotFound isAuth={this.state.isAuth} {...props}/>}/>
                    </Switch>
                </div>
            </Router>
        );
    }

    SignInCallback = (state) => {
        console.log('wow');
        console.log(this.state);
        signInUser(state.email, state.password).then((response) => {
            console.log(this.state);
            response.json().then((json) => {
                let token = json.token;
                console.log('wow');
                getUserInfo(json.token).then((response) => {
                    if (!response.ok)
                        return;
                    response.json().then((json) => {
                        let userId = json.id;
                        console.log('wow22');
                        this.setState({
                            token: token,
                            userId: userId,
                            isAuth: true
                        });
                        console.log('wow33');
                    })
                });
            });
        });
    };

    SignUpCallback = (state) => {
        let dateOfBirth = state.date.split('/').reverse().join('-');
        dateOfBirth = new Date(dateOfBirth).toISOString();
        signUpUser(state.email, state.password, state.name, dateOfBirth).then(function (response) {
            if (!response.ok)
                return;
            response.json().then((json) => {
                let token = json.token;
                getUserInfo(json.token).then((response) => {
                    if (!response.ok)
                        return;
                    response.json().then((json) => {
                        let userId = json.id;
                        this.setState({
                            userId: userId,
                            token: token
                        })
                    });
                });
            });
        });
    };

    SignOutCallback = () =>  {
        this.setState({
            isAuth: false
        });
    };
}


export default App;