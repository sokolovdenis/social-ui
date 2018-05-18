import React from 'react';

import Api from '../api'

import UserList from './UserList'
import Loading from './Loading'

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
            return (<Loading />)
        }
        return (
            <UserList items={ this.state.users } me={this.props.me} />
        );
    }
}

export default Followings;