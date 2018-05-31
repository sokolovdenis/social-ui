import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Header extends Component {
    render() {
        if (this.props.isAuth) {
            return (
                <header>
                    <div className="header_wrapper">
                        <nav>
                            <Link to={"/user_profile/" + this.props.userId}>Profile</Link>
                            <Link to="/sign_out">Log Out</Link>
                        </nav>
                    </div>
                </header>
            );
        }
        else {
            return (
                <header>
                    <div className="header_wrapper">
                        <nav>
                            <Link to="/sign_in">Sign In</Link>
                            <Link to="/sign_up">Sign Up</Link>
                        </nav>
                    </div>
                </header>
            );
        }
    }
}

export default Header;