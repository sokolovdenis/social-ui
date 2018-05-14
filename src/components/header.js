import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import './header.css';

class HeaderComponent extends Component {
    render() {
        if (this.props.is_authenticated) {
            return (
                <header>
                    <div className="sidebar">
                        <Link to="/feed">Лента</Link>
                        <Link to={"/profile/" + this.props.user_id}>Профиль</Link>
                        <Link to="/people">Люди</Link>
                        <Link to="/settings">Настройки</Link>
                        <Link to="/sign_out">Выйти</Link>
                    </div>
                </header>
            );
        }
        else {
            return (
                <header>
                    <div className="sidebar">
                        <Link to="/sign_in">Войти</Link>
                        <Link to="/sign_up">Регистрация</Link>
                    </div>
                </header>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        is_authenticated: state.authentication.is_authenticated,
        user_id: state.authentication.user_id
    }
}

const HeaderContainer = connect(
    mapStateToProps
)(HeaderComponent);

export default HeaderContainer;