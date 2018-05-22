import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

import style from './components.css';


class SignOut extends Component {
    render() {
        this.props.unsetUser();
        return (
            <Redirect to={{pathname: "/sign_in"}}/>
        )
    }
}

export default SignOut;
