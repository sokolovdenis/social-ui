import React from 'react';

class UserStatistics extends React.Component {
    render() {
        return (
            <div className="user-statistics">
                <div>
                    <p className="user-statistics__label">Tweets</p>
                    <p className="user-statistics__number">{ this.props.postCount }</p>
                </div>
                <div>
                    <p className="user-statistics__label">Following</p>
                    <p className="user-statistics__number">{ this.props.followingsCount }</p>
                </div>
                <div>
                    <p className="user-statistics__label">Followers</p>
                    <p className="user-statistics__number">{ this.props.followersCount }</p>
                </div>
            </div>
        );
    }
}

export default UserStatistics;