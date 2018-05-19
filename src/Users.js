import React, {Component} from 'react';
import Fetch from './Fetch';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

import './Users.css';

const mapStateToProps = state => ({
    token: state.token
});

const UsersBase = ({data, isLoading, error}) => {

    const users = data;

    if (error) {
        return (
            <div className='Users'>
                <div>{error.message}</div>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className='Users'>
                <div>Loading...</div>
            </div>
        )
    }

    return (
        <div className='Users'>
            <h2>All users</h2>
            {users.map(user =>
                <div key={user.id}>
                    <Link to={`/profile/${user.id}`}>{user.name}</Link>
                </div>
            )}
        </div>
    );
};

class Users extends Component {
    render() {
        let FetchedComponent = Fetch('GET', 'users', {token: this.props.token})(UsersBase);
        return <FetchedComponent />
    }
}

export default connect(mapStateToProps)(Users);
