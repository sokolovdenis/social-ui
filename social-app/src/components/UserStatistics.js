import React from 'react';
import { Link } from 'react-router-dom'

class UserStatistics extends React.Component {
    render() {
        return (
            <div className="user-statistics">
                <div>
                    <p className="user-statistics__label">Tweets</p>
                    <p className="user-statistics__number">{ this.props.postCount }</p>
                </div>
                <Link to={ `/users/${this.props.id}/followings` }>
                    <p className="user-statistics__label">Following</p>
                    <p className="user-statistics__number">{ this.props.followingsCount }</p>
                </Link>
                <Link to={ `/users/${this.props.id}/followers` }>
                    <p className="user-statistics__label">Followers</p>
                    <p className="user-statistics__number">{ this.props.followersCount }</p>
                </Link>
            </div>
        );
    }
}

export default UserStatistics;