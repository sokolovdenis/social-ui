import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends React.PureComponent {
    render() {
        return (
            <header>
                <div class="logo">MyFacebook</div>
                <nav class="header-menu">
                    <Link to='/'>Мой профиль</Link>
                    <Link to='/'>Выход</Link>
                </nav>
            </header>
        );
    }
}

export default Header;