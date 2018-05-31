import React, {Component} from 'react';

import Post from './Post'
import {getUserInfoId, getUserFollowings, getUserFollowers, getWall} from '../api'

import './components.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: {
                id: null,
                name: null,
                birthday: null,
                imageUrl: null,
                info: null
            },
            followers: [],
            followings: [],
            posts: [],
            userOnPage: undefined,
            loaded: false
        };
    }

    render() {
        if (!this.state.loaded){
            this.loadUser(this.props.match.params.id);
        }

        let user_image = <div className="fake_img" style={{height: "200px"}}>Image</div>;
        if (this.state.userDetails.imageUrl != null) {
            user_image = <img alt="user_image" src={this.state.userDetails.imageUrl}
                              style={{height: "200px", width: "200px"}}/>;
        }

        let posts = this.state.posts.map((x) => {
            return <Post postDetails={x} key={x.id}/>
        });

        return (
            <main>
                <div className="side_column">
                </div>
                <div className="content_column">
                    <div className="content_subcolumn_small">
                        {user_image}
                        <h3>{this.state.userDetails.name}</h3>
                        <p>{this.state.userDetails.info}</p>
                        <p>Subscribers: {this.state.followers.length}</p>
                        <p>Subscriptions: {this.state.followings.length}</p>
                    </div>
                    <div className="content_subcolumn_big">
                        <h2>
                            Posts:
                        </h2>
                        {posts}
                    </div>
                </div>
                <div className="side_column">
                </div>
            </main>
        );
    }

    loadUser = (id) => {
        getUserInfoId(id, this.props.token).then((response) => {
            if (!response.ok)
                return;
            response.json().then((json) => {
                this.setState({
                    userDetails: json,
                    userOnPage: id,
                    loaded: true
                });
            });
        });
        getUserFollowers(id, this.props.token).then((response) => {
            if (!response.ok)
                return;
            response.json().then((json) => {
                this.setState({
                    followers: json
                });
            });
        });
        getUserFollowings(id, this.props.token).then((response) => {
            if (!response.ok)
                return;
            response.json().then((json) => {
                this.setState({
                    followings: json
                });
            });
        });
        getWall(id, this.props.token).then((response) => {
            if (!response.ok)
                return;
            response.json().then((json) => {
                this.setState({
                    posts: json
                });
            });
        })
    }
}

export default Profile;