import React, {Component} from 'react';

import Fetch from './Fetch';
import Followers from './Followers';
import Feed from './Feed';

import './Profile.css';

function getAge(birthday) {
    let date = new Date(birthday);
    let ageDiff = new Date(Date.now() - date.getTime());
    return Math.abs(ageDiff.getUTCFullYear() - 1970);
}

const ProfileBase = ({data, isLoading, error}) => {

    const profile = data;

    if (error) {
        return (
            <div className='Profile'>
                <div>{error.message}</div>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className='Profile'>
                <div>Loading...</div>
            </div>
        )
    }

    return (
        <div className="Profile">
            Profile<br />
            Name: {profile.name}<br />
            Age: {getAge(profile.birthday)}<br />
            {/*<img src={profile.imageUrl} /><br />*/}
            Info: {profile.info}<br />
            <Followers userId={profile.id} type='followers' />
            <Followers userId={profile.id} type='followings' />
            <Feed userId={profile.id} type='wall' />
        </div>
    );
};


class Profile extends Component {
    render() {
        let FetchedComponent = Fetch('GET', `users/${this.props.match.params.number}`)(ProfileBase);
        return <FetchedComponent />
    }
}

export default Profile;
