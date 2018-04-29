import React from 'react';
import { Link } from 'react-router-dom'

import './Header.css'

class Header extends React.PureComponent {
    render() {
        return (
            <div class="header">
                <header class="header__container">
                    <Link to="/" class="header__logo">Social App</Link>
                    <div id="create-post-header-button" class="header__post-button button">
                        Say!
                    </div>
                </header>
            </div>
        );
    }
}

export default Header;