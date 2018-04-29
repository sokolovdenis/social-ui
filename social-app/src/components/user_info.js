import React from 'react';
import './post.css'

class UserInfo extends React.Component {

    render() {
        if (!this.props.user || !this.props.stats) {
            return null;
        }
        let { imageUrl, name, info, postCount, followers, followings } = this.props.user;
        let { postsCount, followersCount, followingsCount } = this.props.stats;

        console.log(this.props.user);
        console.log(this.props.stats);

        return (
            <nav id="state-is-view-other" class="profile-container">
                <img class="profile-pic" src={ imageUrl } alt="user photo" />
                <div class="profile__bottom">
                    <div class="profile-name">{ name }</div>
                    <div class="user-statistics">
                        <div>
                            <p class="user-statistics__label">Tweets</p>
                            <p class="user-statistics__number">{ postsCount }</p>
                        </div>
                        <div>
                            <p class="user-statistics__label">Following</p>
                            <p class="user-statistics__number">{ followingsCount }</p>
                        </div>
                        <div>
                            <p class="user-statistics__label">Followers</p>
                            <p class="user-statistics__number">{ followersCount }</p>
                        </div>
                    </div>
                    <div class="profile-age">
                        21 years
                </div>
                    <div class="profile-about"> { info }</div>
                    <div class="profile-interact button">
                        Subscribe
                    </div>
                </div>
            </nav>
        );
    }
}

export default UserInfo;