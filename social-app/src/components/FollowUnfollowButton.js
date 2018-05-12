import React from 'react';
import Api from '../api'

class FollowUnfollowButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFollowing: false
        };
    }

    componentDidMount() {
        const isFollowing = this.props.me.followings.map(item => item.id).includes(this.props.userId);
        this.setState({isFollowing});
    }

    render() {
        if (this.state.isFollowing) {
            return (<div onClick={ (event) => this.unfollow(this.props.userId) } className="profile-interact button">Unfollow</div>);
        } else {
            return (<div onClick={ (event) => this.follow(this.props.userId) } className="profile-interact button">Follow</div>);
        }
    }

    follow(id) {
        Api.follow(id)
    }

    unfollow(id) {
        Api.unfollow(id)
    }
}


export default FollowUnfollowButton;