import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Moment from 'react-moment'

import Wall from './Wall'
import {getFollowers, getFollowings, getUser, subscribe, unsubscribe} from "../api";
import './components.css';


export class Profile extends Component {
    state = {
        userDetails: {
            id: undefined,
            name: undefined,
            birthday: undefined,
            imageUrl: undefined,
            info: undefined
        },
        userFollowers: undefined,
        userFollowing: undefined,
    };

    componentWillMount() {
        const {userId} = this.props.match.params;
        const {token} = this.props.getUser();
        let userDetails = undefined;
        let userFollowers = undefined;
        let userFollowing = undefined;
        Promise.all([
            getUser(userId, token).then(json => {
                userDetails = json
            }),
            getFollowers(userId, token).then(json => {
                userFollowers = json
            }),
            getFollowings(userId, token).then(json => {
                userFollowing = json
            })
        ]).then(() => {
            document.title = userDetails.name;
            this.setState({
                userDetails: userDetails,
                userFollowers: userFollowers,
                userFollowing: userFollowing
            });
        });
    }

    SubscribeButton = () => {
        const {userId, token} = this.props.getUser();

        if (this.state.userDetails.id !== userId) {
            let label = null;
            let action = undefined;

            let followersIds = this.state.userFollowers.map((currentValue, index, array) => {
                return currentValue.id
            });

            if (!followersIds.includes(userId)) {
                label = 'Subscribe';
                action = subscribe;
            } else {
                label = 'Unsubscribe';
                action = unsubscribe
            }
            let onClick = () => {
                action(this.state.userDetails.id, token).then(() => this.componentWillMount());
            };
            return (
                <div>
                    <button className="button" onClick={onClick}>{label}</button>
                </div>
            )
        } else {
            return null
        }
    };

    AddNewPostButton = () => {
        if (this.state.userDetails.id !== this.props.getUser().userId) {
            return null
        } else {
            return <Link className="button" to="/add_post">Add New Post</Link>
        }
    };

    render() {
        if (!(this.state.userFollowers && this.state.userFollowing)) {
            return null;
        }
        let user_image = <img alt="user_image"
                              src={this.state.userDetails.imageUrl || 'https://flipagram.com' +
                              '/assets/resources/img/fg-avatar-anonymous-user-retina.png'}
                              style={{height: "200px", width: "200px"}}/>;

        return (
            <div>
                <div style={{display: 'flex'}}>
                    {user_image}
                    <div style={{marginLeft: '5%'}}>
                        <h1 id="posts_header" align="center">{this.state.userDetails.name}</h1>
                        <p>Followers: {this.state.userFollowers.length}</p>
                        <p>Following: {this.state.userFollowing.length}</p>
                        <Moment format="D MMMM YYYY">{this.state.userDetails.birthday}</Moment>
                    </div>
                </div>
                <div className="content_header">
                    <this.SubscribeButton/>
                    <this.AddNewPostButton/>

                </div>
                <Wall userId={this.state.userDetails.id} getUser={this.props.getUser}/>
            </div>
        );
    }
}
