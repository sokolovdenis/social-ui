import React, {Component} from 'react';
import {Link} from "react-router-dom";

import './footer.css';

/*
    Footer страницы
 */

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="footer_links">
                    <Link to="/people">About Us</Link>
                    <Link to="/people">Career</Link>
                </div>
            </footer>
        );
    }
}

export default Footer;