import React from 'react';

import Api from '../api'

import UserList from './UserList'

class Followings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: null
        }
    }

    componentDidMount() {
        Api.getUsersFollowings(this.props.id)
            .then((users) => {
                this.setState({ users });
            });
    }

    render() {
        if (!this.state.users) {
            return (<div>Loading...</div>)
        }
        return (
            <UserList items={ this.state.users } me={this.props.me} />
        );
    }
}

export default Followings;