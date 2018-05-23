import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import HeaderContent from './HeaderContent.js'
import './css/style.css'
import './css/header.css'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { isClicked: false };
    
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }
  
  handleMenuClick() {
    this.setState({ isClicked: !this.state.isClicked });
  }
  
  
  
  render() {
    const { isClicked } = this.state;
    return (
      <div className="header">
          <div className={ isClicked ? "menu is-active" : "menu" }>
              <nav className={ isClicked ? "navPanel is-active" : "navPanel" }>
                  <HeaderContent/>
              </nav>
              <div className={isClicked ? "hamburger is-active" : "hamburger"} onClick={this.handleMenuClick}>
                  <span className="line"></span>
                  <span className="line"></span>
                  <span className="line"></span>
              </div>
          </div>

          <div className="logo">
              <Link to="/">Hlopia</Link>
          </div>
          <nav className="navMain">
            <HeaderContent/>
          </nav>

      </div>
    );
  }
}

export default Header
