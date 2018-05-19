import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './style.css'


class LoginNavigation extends Component {
    render() {
        return <nav className="nav">
            <ul>
                <Link to='/register'>
                    <li>Sign up</li>
                </Link>
                <Link to='/login'>
                    <li>Sign in</li>
                </Link>
            </ul>
        </nav>;
    }
}

export default LoginNavigation;
