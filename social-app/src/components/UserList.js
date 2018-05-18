import React from 'react';

import UserListItem from './UserListItem'
import Loading from './Loading'

import './UserList.css'

class UserList extends React.Component {
    render() {
        if (!this.props.items) {
            return (<Loading />)
        }
        return (
            <div class="user-list">
                { this.props.items.map(item => <UserListItem user={ item } me={this.props.me}/>) }
            </div>
        );
    }
}

export default UserList;