import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

import './components.css';

/*
    Страница 404
    TODO: Сделать какую-нибудь красивую картинку?
 */

class PageNotFoundPresentation extends Component {
    render() {
        document.title = "Friends - PageNotFound";
        if (!this.props.isAuthenticated) {
            return <Redirect to={{
                pathname: "/log_in"
            }}/>
        }
        return (
            <main>
                <h1>PAGE NOT FOUND</h1>
            </main>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.authentication.isAuthenticated
    }
}

const PageNotFoundContainer = connect(
    mapStateToProps
)(PageNotFoundPresentation);

export default PageNotFoundContainer;