import React, {Component} from 'react';

import User from './User'
import {getUsers} from '../api'

import './components.css';

class UsersList extends Component {
    state = {
        users: undefined
    };

    componentWillMount() {
        const {token} = this.props.getUser();
        getUsers(token).then(json => {
            this.setState({
                users: json
            });
            document.title = "All Users";
        });
    }

    render() {
        if (this.state.users === undefined) {
            return null
        }

        let users = [];
        for (let user_id in this.state.users) {
            users.push(<User info={this.state.users[user_id]} key={user_id}/>)
        }
        return (
            <div className="content_column">
                <div className="content_header">
                    <h1 align="center">People:</h1>
                </div>
                <div>
                    {users}
                </div>
            </div>
        );
    }
}

export default UsersList;
