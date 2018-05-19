import React from 'react';
import { Link } from 'react-router-dom'

import './Header.css'

class Header extends React.PureComponent {
    render() {
        const info = this.props.me.myInfo;
        return (
            <div className="header">
                <header className="header__container">
                    <Link to="/" className="header__logo">Social App</Link>
                    <div className="header__right">
                        <div className="header__signout-button" onClick={(event) => this.props.onSignOut()}>sign out</div>
                        <Link to={`/users/${info.id}`}>
                            <img className="header__user-image" src={info.imageUrl} alt="user photo" />
                        </Link>
                    </div>
                </header>
            </div>
        );
    }
}

export default Header;