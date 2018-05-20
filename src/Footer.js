import React, {Component} from 'react';
import './Footer.css';

function getCurrentYear() {
    let date = new Date();
    return date.getFullYear();
}

class Footer extends Component {
    render() {
        return (
            <div className='footer'>
                <div className="footer-copyright">&copy; {getCurrentYear()}</div>
            </div>
        );
    }
}

export default Footer;
