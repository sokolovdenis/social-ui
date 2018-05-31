import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

import './components.css';

class PageNotFound extends Component {
    render() {
        if (!this.props.isAuth) {
            return <Redirect to={{
                pathname: "/sign_in"
            }}/>
        }
        return (
            <main>
                <h1>PAGE NOT FOUND</h1>
            </main>
        );
    }
}

export default PageNotFound;