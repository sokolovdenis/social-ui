import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {sign_out_action} from "../actions";

import './signout.css';

class LogOutComponent extends Component {
    render() {
        this.props.sign_out();
        return <Redirect to={{
            pathname: "/log_in"
        }}/>
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sign_out: () => {
            dispatch(sign_out_action())
        },
    }
}

const LogOutContainer = connect(
    null,
    mapDispatchToProps
)(LogOutComponent);


export default LogOutContainer;