import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import Api from './Api'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        console.log('Logging in', this.state)
        let history = this.props.history;
        Api.post('/identity/signin', this.state)
            .then(function(response) {
                Api.setToken(response.data.token);
                Api.get('/users/me').then(response => history.push('/profile/' + response.data.id));
            });
        event.preventDefault();
    }

    componentDodMount() {
        this.props.history.push('/login');
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar title='Login' />
                        <TextField hintText='Enter your Email' floatingLabelText='Email' 
                            onChange={(event, newValue) => this.setState({email: newValue})} />
                        <br />
                        <TextField type='password' hintText='Enter your Password' floatingLabelText='Password'
                            onChange={(event, newValue) => this.setState({password: newValue})} />
                        <br />
                        <RaisedButton label='Login' primary={true} // TODO: style
                            onClick={this.handleClick} /> 
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withRouter(Login);