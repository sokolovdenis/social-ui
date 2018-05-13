import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './Header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false}
    }

    handleLoginClick() {
        this.setState({isLoggedIn: true})
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false})
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;

        const button = isLoggedIn ? (
            <div className="login" onClick={this.handleLogoutClick}>Login</div>
        ) : (
            <div className="login" onClick={this.handleLoginClick}>Logout</div>
        );

        return (
            <div className="Header">
                <Link to='/'>Header</Link>
                {isLoggedIn}
                {button}
                <Link to='/users'>All users</Link>
            </div>
        );
    }
}

export default Header;
