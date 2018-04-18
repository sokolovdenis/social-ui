import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import PostListItem from './PostListItem'
import {getUserFollowers, getUserFollowings, getUserInfoId, getWall, subscribe, unsubscribe} from "../api";
import {subscribeAction, unsubscribeAction} from "../actions";
import './components.css';

/*
    Страница пользователя
    Большое число функций:
        - подписка на пользователя
        - отображение информации о пользователе
        - отображение постов пользователя
 */

class ProfilePresentation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            user_loaded: null,
            userDetails: {
                id: null,
                name: null,
                birthday: null,
                imageUrl: null,
                info: null
            },
            user_followers: [],
            user_followings: [],
            posts: [],
        };
        this.loadUserDetails = this.loadUserDetails.bind(this);
        this.subscribeButton = this.subscribeButton.bind(this);
    }

    loadUserDetails(id) {
        getUserInfoId(id, this.props.token).then((response) => {
            if (!response.ok)
                return;
            response.json().then((json) => {
                this.setState({
                    userDetails: json,
                    isLoaded: true,
                    user_loaded: id
                });
                document.title = "Friends - " + json.name;
            });
        });
        getUserFollowers(id, this.props.token).then((response) => {
            if (!response.ok)
                return;
            response.json().then((json) => {
                this.setState({
                    user_followers: json
                });
            });
        });
        getUserFollowings(id, this.props.token).then((response) => {
            if (!response.ok)
                return;
            response.json().then((json) => {
                this.setState({
                    user_followings: json
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

    subscribeButton() {
        if (this.state.userDetails.id !== this.props.userId &&
            !this.props.followings.includes(this.state.userDetails.id)) {
            return (
                <div className="centered_button">
                    <button
                        className="button"
                        onClick={() => this.props.onSubscribeButton(true, this, this.state.userDetails.id, this.props.token)}
                        id="subscribe_button">Subscribe
                    </button>
                </div>
            );
        }
        else if (this.state.userDetails.id !== this.props.userId &&
            this.props.followings.includes(this.state.userDetails.id)) {
            return (
                <div className="centered_button">
                    <button
                        className="button"
                        onClick={() => this.props.onSubscribeButton(false, this, this.state.userDetails.id, this.props.token)}
                        id="subscribe_button">Unsubscribe
                    </button>
                </div>
            );
        }
        else return null;
    }

    render() {
        if (!this.state.isLoaded || this.state.user_loaded !== this.props.match.params.id) {
            this.loadUserDetails(this.props.match.params.id);
        }
        let user_image = <div className="fake_img" style={{height: "200px"}}>Image</div>;
        if (this.state.userDetails.imageUrl != null) {
            user_image = <img alt="user_image" src={this.state.userDetails.imageUrl}
                              style={{height: "200px", width: "200px"}}/>;
        }
        let posts = this.state.posts.map((x) => {
            return <PostListItem postDetails={x} key={x.id}/>
        });
        return (
            <main>
                <div className="side_column">
                    <h2>{this.state.userDetails.name}</h2>
                    {user_image}
                    <p id="user_data">
                        Birth Date: {new Date(this.state.userDetails.birthday).toDateString()}
                        <br/>
                        Subscribers: {this.state.user_followers.length}
                        <br/>
                        Subscriptions: {this.state.user_followings.length}
                    </p>
                    {this.subscribeButton()}
                    <p>
                        {this.state.userDetails.info}
                    </p>
                </div>
                <div className="content_column">
                    <div className="content_header">
                        <h1 id="posts_header" align="center">{this.state.userDetails.name} - Page</h1>
                        <Link className="button" to="/add_post">Add New Post</Link>
                    </div>
                    {posts}
                </div>
                <div className="side_column">
                    <h2>SOME ADS HERE</h2>
                    <div className="fake_img" style={{height: "200px"}}>Image</div>
                    <p>
                        The Coca-Cola Company (NYSE: KO) is the world’s largest beverage company, offering over 500
                        brands to people in more than 200 countries. Of our 21 billion-dollar brands, 19 are available
                        in lower- or no-sugar options to help people moderate their consumption of added sugar.
                    </p>
                    <p>
                        In addition to our namesake Coca-Cola drinks, some of our leading brands around the world
                        include:
                        AdeS soy-based beverages, Ayataka green tea, Dasani waters, Del Valle juices and nectars,
                        Fanta, Georgia coffee, Gold Peak teas and coffees, Honest Tea, Minute Maid juices,
                        Powerade sports drinks, Simply juices, smartwater, Sprite, vitaminwater, and Zico coconut water.
                    </p>
                    <p>
                        At Coca-Cola, we’re serious about making positive contributions to the world. That starts
                        with reducing sugar in our drinks and continuing to introduce new ones with added benefits.
                        It also means continuously working to reduce our environmental impact, creating rewarding
                        careers for our associates and bringing economic opportunity wherever we operate. Together
                        with our bottling partners, we employ more than 700,000 people around the world.
                    </p>
                </div>
            </main>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        token: state.authentication.token,
        userId: state.authentication.userId,
        followings: state.followings
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onSubscribeButton: (to_subscribe, obj, id, token) => {
            if (to_subscribe) {
                subscribe(id, token).then((response) => {
                    if (!response.ok)
                        return;
                    dispatch(subscribeAction(id));
                    getUserFollowers(id, token).then((response) => {
                        if (!response.ok)
                            return;
                        response.json().then((json) => {
                            obj.setState({
                                user_followers: json
                            });
                        });
                    });
                })
            }
            else {
                unsubscribe(id, token).then((response) => {
                    if (!response.ok)
                        return;
                    dispatch(unsubscribeAction(id));
                    getUserFollowers(id, token).then((response) => {
                        if (!response.ok)
                            return;
                        response.json().then((json) => {
                            obj.setState({
                                user_followers: json
                            });
                        });
                    });
                })
            }
        }
    }
}

const ProfileContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePresentation);

export default ProfileContainer;