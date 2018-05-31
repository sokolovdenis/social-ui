import React, {Component} from 'react'
import {Redirect} from "react-router-dom";

class SignOut extends Component {
    render() {
        this.props.SignOutCallback();
        return <Redirect to={{
            pathname: "/sign_in"
        }}/>
    }
}

export default SignOut