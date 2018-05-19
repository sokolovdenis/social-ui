import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import './Header.css';
import {deleteToken} from "./actions/actions";

const mapStateToProps = state => ({
    token: state.token
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

    componentWillUpdate(newProps) {
        if (newProps.token !== this.props.token) {
            this.render();
        }
    }

    render() {
        if (this.state.redirect) {
            return (
                <div className="Header">
                    <Redirect push to="/" />
                    <div className="Header">
                    <Link to='/'>Header</Link>
                    </div>
                </div>
            );
        }

        if (this.props.token) {
            return (
                <div className="Header">
                    <Link to='/'>Header</Link>
                    <div className="login" onClick={this.handleLogoutClick}>Logout</div>
                    <Link to='/users'>All users</Link>
                </div>
            );
        }

        return (
            <div className="Header">
                <Link to='/'>Header</Link>
            </div>
        )


    }
}

export default connect(mapStateToProps)(Header);
