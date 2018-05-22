import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom"

import cookie from 'react-cookies'

import BackEndError from './components/BackEndError'
import Header from './Header'
import SideColumn from './components/SideColumn'

import SignInForm from "./components/SignInForm"
import SignUpForm from './components/SignUpForm'
import SignOut from './components/SignOut'

import AddPost from "./components/AddPost";
import Feed from './components/Feed'
import Settings from './components/Settings'
import UsersList from './components/UsersList'

import {getMe} from './api'
import {Profile} from "./components/Profile";


const BASE_ROUTES = {'/sign_up': SignUpForm, '/sign_in': SignInForm};
const AUTHORIZED_ROUTES = {
    '/add_post': AddPost,
    '/all_users': UsersList,
    '/sign_out': SignOut,
    '/feed': Feed,
    '/profile/:userId': Profile,
    '/settings': Settings
};


class App extends Component {
    state = {
        checkedCookie: undefined,
        token: undefined,
        userId: undefined,
        backEndError: false,
        leftColumn: null,
        rightColumn: null
    };

    componentWillMount() {
        let token = cookie.load('token');
        if (token) {
            getMe(token).then(userId => {
                this.setUser(userId, token);
                this.setState({checkedCookie: true})
            });
        } else {
            this.setState({checkedCookie: true})
        }
    }

    isAuthenticated = () => {
        return this.state.token !== undefined && this.state.userId !== undefined
    };
    onBackEndError = () => this.setState({backEndError: true});
    getUser = () => {
        return {userId: this.state.userId, token: this.state.token};
    };
    setUser = (userId, token, setCookie = false) => {
        this.setState({userId: userId, token: token});
        if (setCookie) {
            cookie.save('token', token, {path: '/'})
        }
    };
    unsetUser = () => {
        this.setState({
            token: undefined,
            userId: undefined
        });
        cookie.remove('token');
    };

    changeLeftColumn = (value) => this.setState({leftColumn: value});
    changeRightColumn = (value) => this.setState({rightColumn: value});
    getPassedProps = (props) => {
        return {
            setUser: this.setUser,
            isAuthenticated: this.isAuthenticated,
            getUser: this.getUser,
            onBackEndError: this.onBackEndError,
            unsetUser: this.unsetUser,
            changeLeftColumn: this.changeLeftColumn,
            changeRightColumn: this.changeRightColumn,
            ...props
        }
    };

    render() {
        if (!this.state.checkedCookie) {
            return null
        }

        let routes = null;
        let autoRedirectPathname = null;
        if (this.isAuthenticated()) {
            routes = AUTHORIZED_ROUTES;
            autoRedirectPathname = '/profile/' + this.state.userId
        } else {
            routes = BASE_ROUTES;
            autoRedirectPathname = "/sign_in"
        }

        const renderedRoutes = Object.keys(routes).map(
            (item, i, arr) => <Route path={item}
                                     render={(props) => React.createElement(routes[item], this.getPassedProps(props))}
                                     key={item}/>
        );

        renderedRoutes.push(
            <Route path="/" render={(props) => <Redirect to={{pathname: autoRedirectPathname}}/>} key="/"/>
        );
        if (this.state.backEndError) {
            return (
                <BackEndError/>
            )
        } else {
            return (
                <Router>
                    <div className="wrapper">
                        <Header isAuthenticated={this.isAuthenticated} getUser={this.getUser}/>
                        <main>
                            <SideColumn inside={this.state.leftColumn}/>
                            <div className="content_column">
                                <Switch>
                                    {renderedRoutes}
                                </Switch>
                            </div>
                            <SideColumn inside={this.state.rightColumn}/>
                        </main>
                    </div>
                </Router>
            )
        }
    }
}

export default App;
