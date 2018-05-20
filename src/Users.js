import React, {Component} from 'react';
import Fetch from './Fetch';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

import './Users.css';

const mapStateToProps = state => ({
    token: state.token
});

function getAvatar(user) {
    console.log(user.imageUrl);
    if (user.imageUrl) {
        return user.imageUrl;
    }
    return '/icons/default-avatar.png';
}

const UsersBase = ({data, isLoading, error}) => {

    const users = data;

    if (error) {
        return (
            <div className="global-error global-info">{error.message}</div>
        )
    }

    if (isLoading) {
        return (
            <div className="global-info">Loading...</div>
        )
    }

    return (
        <div className='users-list'>
            <div className='users-scroll global-flex'>
                {users.map(user =>
                    <div key={user.id} className="users-element">
                        <Link to={`/profile/${user.id}`}>
                            <div className="global-avatar avatar">
                                <img src={getAvatar(user)} className="global-avatar-image avatar-image" alt="User avatar" />
                            </div><br/>
                            <div className="users-label">
                                {user.name}
                            </div>
                        </Link>
                    </div>
                )}
            </div>
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
