import React from 'react';
import { Link } from 'react-router-dom'
import "./UserStatistics.css"

class UserStatistics extends React.Component {
    render() {
        return (
            <div className="user-statistics">
                <Link to={ `/users/${this.props.id}/followings` } className = "user-statistics__block" >
                    <p className="user-statistics__label">Following</p>
                    <p className="user-statistics__number">{ this.props.followingsCount }</p>
                </Link>
                <Link to={ `/users/${this.props.id}/followers` } className = "user-statistics__block" >
                    <p className="user-statistics__label">Followers</p>
                    <p className="user-statistics__number">{ this.props.followersCount }</p>
                </Link>
            </div>
        );
    }
}

export default UserStatistics;