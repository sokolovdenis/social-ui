import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

class NotFoundComponent extends Component {
    render() {
        document.title = "404";
        if (!this.props.is_authenticated) {
            return <Redirect to={{
                pathname: "/sign_in"
            }}/>
        }
        return <Redirect to={{
            pathname: "/feed"
        }}/>
    }
}

function mapStateToProps(state) {
    return {
        is_authenticated: state.authentication.is_authenticated
    }
}

const NotFoundContainer = connect(
    mapStateToProps
)(NotFoundComponent);

export default NotFoundContainer;