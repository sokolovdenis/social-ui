import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import './header.css';

/*
    Header страницы, содержит набор ссылок на страницы сайта,
    который зависит от авторизованности пользователя на сайте
 */

class HeaderPresentation extends Component {
    render() {
        // Отображаем внутренние ссылки, если пользователь авторизован
        if (this.props.isAuthenticated) {
            return (
                <header>
                    <nav>
                        <Link to={"/profile/" + this.props.userId}>Profile</Link>
                        <Link to="/feed">Feed</Link>
                        <Link to="/settings">Settings</Link>
                        <Link to="/people">People</Link>
                        <Link className="exit_link" to="/log_out">Log Out</Link>
                    </nav>
                </header>
            );
        }
        else {
            return (
                <header>
                    <nav>
                        <Link to="/log_in">Log In</Link>
                        <Link to="/register">Register</Link>
                    </nav>
                </header>
            );
        }
    }
}

function mapStateToProps(state) {
    // Необходима информация об авторизованности пользователя
    // для отображения правильного набора ссылок
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        userId: state.authentication.userId
    }
}

const HeaderContainer = connect(
    mapStateToProps
)(HeaderPresentation);

export default HeaderContainer;