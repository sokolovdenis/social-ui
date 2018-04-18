import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {signOutAction} from "../actions";

import './components.css';

/*
    Компонент деавторизации на сайте
    Не отображается, только обновляет store и пересылает пользователя
 */

class LogOutPresentation extends Component {
    render() {
        this.props.signOut();
        return <Redirect to={{
            pathname: "/log_in"
        }}/>
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signOut: () => {
            dispatch(signOutAction())
        },
    }
}

const LogOutContainer = connect(
    null,
    mapDispatchToProps
)(LogOutPresentation);


export default LogOutContainer;