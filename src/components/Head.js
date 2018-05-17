import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

class Head extends Component {
  render() {
    return (
      <header className="App-header">
        <img src='/img/logo.png' alt='Social' />
        <nav className="App-menu">
          <ul>
            <li><Link to='/'>Профиль</Link></li>
            <li><Link to='/feed'>Лента</Link></li>
            <li><Link to='/users'>Люди</Link></li>
            <li><div onClick={this.props.exitCall}>Выход</div></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Head
