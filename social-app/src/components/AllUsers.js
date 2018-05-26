import React from 'react';

import Api from '../Api'

import UserList from './UserList'
import Loading from './Loading'

class AllUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: null
        }
    }

    componentDidMount() {
        Api.getAllUsers()
            .then((users) => {
                this.setState({ users });
            });
    }

    render() {
        if (!this.state.users) {
            return (<Loading />)
        }
        return (
            <UserList items={ this.state.users } me={this.props.me} />
        );
    }
}

export default AllUsers;