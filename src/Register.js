import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

import Api from './Api'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', 
            email: '',
            password: '',
            birthday: new Date()
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleNameChange(event, newName) {
        this.setState({name: newName});
    }

    handleEmailChange(event, newEmail) {
        // TODO
        this.setState({email: newEmail});
    }

    handlePasswordChange(event, newPassword) {
        this.setState({password: newPassword});
    }

    handleDateChange(event, newDate) {
        this.setState({birthday: newDate});
    }

    handleClick(event) {
        console.log('Registering', this.state);
        let history = this.props.history;
        Api.post('/identity/signup', this.state)
            .then(function(response) {
                console.log(response.data);
                Api.setToken(response.data.token);
                Api.get('/users/me').then(response => history.push('/profile/' + response.data.id));
            });
        event.preventDefault();
    }

    componentDidMount() {
        this.props.history.push('/register');
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar title='Register' />
                        <TextField hintText='Enter your Name' floatingLabelText='Name Surname' 
                            onChange={this.handleNameChange} />
                        <br />
                        <TextField type='email' hintText='Enter your Email' floatingLabelText='Email' 
                            onChange={this.handleEmailChange} />
                        <br />
                        <TextField type='password' hintText='Enter your Password' floatingLabelText='Password' 
                            onChange={this.handlePasswordChange} />
                        <br />
                        <DatePicker value={this.state.birthday} hintText='Enter your Birthday'
                            onChange={this.handleDateChange} />
                        <br />
                        <RaisedButton label='Register' primary={true} // TODO style
                            onClick={this.handleClick} />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withRouter(Register);