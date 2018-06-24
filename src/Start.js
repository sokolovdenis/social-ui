import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import Login from './Login';
import Register from './Register';

class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loginScreen: [],
            loginMessage: '', 
            buttonLabel: 'Register',
            isRegistered: false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        console.log(event);
        if (this.state.isRegistered) {
            let loginScreen = [];
            loginScreen.push(<Register parentContext={this} />);
            let loginMessage = 'Already registered. Go to login';
            this.setState({
                loginScreen: loginScreen,
                loginMessage: loginMessage,
                buttonLabel: 'Login',
                isRegistered: false
            });
        } else {
            let loginScreen = []
            loginScreen.push(<Login parentContext={this} />);
            let loginMessage = 'Not registered yet. Go to registration';
            this.setState({
                loginScreen: loginScreen,
                loginMessage: loginMessage,
                buttonLabel: 'Register',
                isRegistered: true
            });
        }
    }

    coponentWillMount() {
        let loginScreen = [];
        loginScreen.push(<Login parentContext={this} appContext={this.props.parentContext} />);
        let loginMessage = 'Not registered yet, register now';
        this.setState({
            loginScreen: loginScreen,
            loginMessage: loginMessage
        });
    }

    render() {
        return (
            <div className='loginScreen'>
                {this.state.loginScreen}
                <div>
                    {this.state.loginMessage}
                    <MuiThemeProvider>
                        <div>
                            <RaisedButton label={this.state.buttonLabel} primary={true} // TODO style
                                onClick={this.handleClick} />
                        </div>
                    </MuiThemeProvider>
                </div>
            </div>

        );
    }
}

export default Start;