import React, {Component} from 'react';

import './Followers.css';
import {connect} from "react-redux";

const mapStateToProps = state => ({
    token: state.token,
    currentUserId: state.currentUserId,
});

class FollowButton extends Component {

    constructor(props) {
        super(props);
        this.onFollow = this.onFollow.bind(this);
        this.getMyFollowings = this.getMyFollowings.bind(this);
        this.setFollowings = this.setFollowings.bind(this);

        this.state = {
            isFollowing: false,
            isLoading: false,
            error: null,
        };
    }

    getMyFollowings() {

        this.setState({isLoading: true});

        fetch(`http://social-webapi.azurewebsites.net/api/users/${this.props.currentUserId}/followings/`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
                'content-type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {this.setState({isLoading: false}); this.setFollowings(data);})
            .catch(receivedError => this.setState({error: receivedError}));
    }

    onFollow(event, doFollow) {

        event.preventDefault();
        this.setState({isLoading: true});

        fetch('http://social-webapi.azurewebsites.net/api/users/me/followings/' + this.props.userId, {
            method: doFollow ? 'POST' : 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
                'content-type': 'application/json'
            },
            body: JSON.stringify({}),
        })
            .then(() => {this.setState({isLoading: false}); this.getMyFollowings();})
            .catch(receivedError => this.setState({error: receivedError}));
    }

    setFollowings(followings) {
        let followingIds = followings.map(user => user.id);
        console.log(followingIds);
        this.setState({isFollowing: followingIds.includes(this.props.userId)});
    }

    componentDidMount() {
        this.getMyFollowings();
    }

    render() {

        if (this.props.currentUserId === this.props.userId) {
            return null;
        }

        if (this.state.isLoading) {
            return (
                <div>Loading...</div>
            )
        }

        if (this.state.error) {
            return (
                <div>{this.state.error.message}</div>
            )
        }

        if (this.state.isFollowing) {
            return (
                <div className="follow-button" onClick={(event) => this.onFollow(event, false)}>
                    Unfollow
                </div>
            )
        }

        return (
            <div>
                <div className="follow-button" onClick={(event) => this.onFollow(event, true)}>
                    Follow
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(FollowButton);
