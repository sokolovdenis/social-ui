import React from 'react';
import Fetch from './Fetch';
import {Link} from 'react-router-dom';

import './Users.css';

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

const Users = Fetch('GET', 'users')(UsersBase);

export default Users;
