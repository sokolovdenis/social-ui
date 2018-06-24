import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', 
            email: '',
            password: '',
            birthday: null
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
        this.setState({email: newEmail});
    }

    handlePasswordChange(event, newPassword) {
        this.setState({password: newPassword});
    }

    handleDateChange(event, newDate) {
        this.setState({birthday: newDate});
    }

    handleClick(event) {
        console.log('Submitting', this.state);
        // TODO: backend
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

export default Register;