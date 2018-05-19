import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import './style.css';
import {is_logged_in} from './auth'
import Navigation from './Navigation'
import LoginNavigation from './LoginNavigation'
import EditProfile from './EditProfile'
import Login from './Login'
import Register from './Register'
import NewPost from './NewPost'

class App extends Component {
    render() {
        const navigation = is_logged_in() ? <Navigation/> : <LoginNavigation/>;
        const body = is_logged_in() ? (
            <Switch>
                <Route path='/edit' component={EditProfile}/>
                <Route path='/new_post' component={NewPost}/>
            </Switch>
        ) : (
            <Switch>
                <Route exact path="/" render={() => (<Redirect to='/login'/>)}/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
            </Switch>
        );
        return (
            <div className="base-container">

                <div className="left-header header-color"/>
                <div className="nav-header header-color ">Header</div>
                <header className="header header-color ">Main Header</header>
                <div className="right-header header-color"/>
                {navigation}
                <main className="main">
                    {body}
                </main>
            </div>
        );
    }
}

export default App;