import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './style.css'


class Navigation extends Component {
    render() {
        return <nav className="nav">
            <ul>
                <Link to='/new_post'>
                    <li>New post</li>
                </Link>
                <Link to='/profile'>
                    <li>Your profile</li>
                </Link>
                <Link to='/news'>
                    <li>News</li>
                </Link>
                <Link to='/all_users'>
                    <li>All users</li>
                </Link>
                <Link to='/edit'>
                    <li>Edit profile</li>
                </Link>
            </ul>
        </nav>;
    }
}

export default Navigation;
