import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import MainArea from './MainArea';
import Footer from './Footer';
import RegistrationForm from './RegistrationForm'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSignedIn: false,
            token: ""
        };
    }

    tokenAddHandler(value) {
        this.state.isSignedIn = true;
        this.state.token = value;
        this.setState({
            isSignedIn: this.state.isSignedIn,
            token: this.state.token
        });
    }

    render() {
        const content = this.state.isSignedIn ? (<MainArea token={this.state.token} />) : (<RegistrationForm onTokenAdd={(value) => this.tokenAddHandler(value)} />);

        return (
            <div className="App">
                <Header />
                {content}
                <Footer />
            </div>
        );
    }
}

export default App;
