import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';

import Api from './Api';

class Profile extends Component {
    constructor(props) {
        super(props);
        if (!Api.getToken()) {
            props.history.push('/login');
        }
        this.state = {
            id: props.match.params.id,
            name: null,
            info: '',
            imageUrl: null,
            birthday: null,
            userId: null
        };
        let setState = this.setState.bind(this);
        Api.get('/users/me')
          .then(response => setState({userId: response.data.id}));
        Api.get('/users/' + this.state.id)
          .then(response => setState(response.data))
          .catch(err => setState({id: false}));
    }

    editProfileButton() {
        if (this.state.id === this.state.userId) {
            return <RaisedButton label='Edit profile' />
        }
    }

    render() {
        return ( 
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar title='Profile' />
                        <h2> {this.state.name} </h2>
                        <Avatar src={this.state.imageUrl} alt='invalid' />
                        <div>
                            {this.state.info}
                        </div>
                        {this.editProfileButton()}
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withRouter(Profile);