import React, {Component} from 'react';
import {Link} from "react-router-dom";

import style from './header.css';


const BASE_NAV_ITEMS = {'/sign_in': 'Sign In', '/sign_up': 'Sign Up'};
const AUTHORIZED_NAV_ITEMS = {
    '/feed': 'Feed',
    '/settings': 'Settings',
    '/all_users': 'Users',
    '/profile/#': 'Profile',
    '/sign_out': 'Log Out'
};


class Header extends Component {
    render() {
        const {userId} = this.props.getUser();
        let nav_items = [];
        if (this.props.isAuthenticated()) {
            nav_items = AUTHORIZED_NAV_ITEMS
        } else {
            nav_items = BASE_NAV_ITEMS
        }
        let rendered_nav_items = [];
        for (let key in nav_items) {
            rendered_nav_items.push(<Link to={key.replace('#', userId)} key={key}>{nav_items[key]}</Link>);
        }

        return (
            <header>
                <nav>
                    {rendered_nav_items}
                </nav>
            </header>
        );
    }
}

export default Header;
