import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import './Header.css';
import {deleteToken} from "./actions/actions";

const mapStateToProps = state => ({
    token: state.token,
    currentUserId: state.currentUserId,
});

class Header extends Component {

    constructor(props) {
        super(props);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {
            redirect: false
        };
    }

    handleLogoutClick() {
        this.props.dispatch(deleteToken());
        this.setState({redirect: true});
    }

    render() {
        if (this.state.redirect) {
        this.setState({redirect: false});
            return (
                <header className="header">
                    IN REDIRECT
                    <Redirect push to="/" />
                    <span className="header-title"><Link to='/'>Social Network</Link></span>
                    <br/>
                </header>
            );
        }

        if (!!this.props.token) {
            return (
                <header className="header">
                    <nav>
                        <span className="header-title"><Link to='/'>Social Network</Link></span>
                        <span className="header-logout" onClick={this.handleLogoutClick}>Logout</span>
                        <span className="header-logout"><Link to='/users'>All users</Link></span>
                        <span className="header-logout"><Link to={`/profile/${this.props.currentUserId}`}>My profile</Link></span>
                        <br/>
                    </nav>
                </header>
            );
        }

        return (
            <header className="header">
                <span className="header-title"><Link to='/'>Social Network</Link></span>
                <br/>
            </header>
        )
    }
}

export default connect(mapStateToProps)(Header);
