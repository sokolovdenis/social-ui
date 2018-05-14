import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import PostComponent from './post'
import {get_followers, get_followings, get_user, get_wall, subscribe, unsubscribe} from "../webapi";
import {subscribe_action, unsubscribe_action} from "../actions";

import './profile.css';

class ProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_loaded: false,
            user_loaded: null,
            user_details: {
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
        this.load_user_details = this.load_user_details.bind(this);
        this.subscribe_button = this.subscribe_button.bind(this);
    }

    load_user_details(id) {
        get_user(id, this.props.token).then((response) => {
            if (!response.ok)
                return;
            response.json().then((json) => {
                this.setState({
                    user_details: json,
                    is_loaded: true,
                    user_loaded: id
                });
                document.title = json.name;
            });
        });
        get_followers(id, this.props.token).then((response) => {
            if (!response.ok)
                return;
            response.json().then((json) => {
                this.setState({
                    user_followers: json
                });
            });
        });
        get_followings(id, this.props.token).then((response) => {
            if (!response.ok)
                return;
            response.json().then((json) => {
                this.setState({
                    user_followings: json
                });
            });
        });
        get_wall(id, this.props.token).then((response) => {
            if (!response.ok)
                return;
            response.json().then((json) => {
                this.setState({
                    posts: json
                });
            });
        })
    }

    subscribe_button() {
        if (this.state.user_details.id !== this.props.user_id) {
            if (this.props.followings.includes(this.state.user_details.id)) {
                return (
                    <div className="centered_button">
                        <button
                            className="button"
                            onClick={() => this.props.on_subscribe_button(false, this, this.state.user_details.id, this.props.token)}
                            id="subscribe_button">Отписаться
                        </button>
                    </div>
                );
            }
            else {
                return (
                    <div className="centered_button">
                        <button
                            className="button"
                            onClick={() => this.props.on_subscribe_button(true, this, this.state.user_details.id, this.props.token)}
                            id="subscribe_button">Подписаться
                        </button>
                    </div>
                );
            }
        }
        else return null;
    }

    render() {
        document.title = "Профиль";
        if (!this.state.is_loaded || this.state.user_loaded !== this.props.match.params.id) {
            this.load_user_details(this.props.match.params.id);
        }
        let user_image = "";
        if (this.state.user_details.imageUrl != null) {
            user_image = <img className="avatar" alt="user_image" src={this.state.user_details.imageUrl}/>;
        }
        let posts = this.state.posts.map((x) => {
            return <PostComponent post_details={x} key={x.id}/>
        });
        let add_post_button = "";
        if (this.state.user_details.id === this.props.user_id) {
            add_post_button = <Link type="button" to="/add_post">Новый пост</Link>
        }
        return (
            <div className="main">
                <div className="profile_info">
                    <div className="profile_row">
                        {user_image}
                    </div>
                    <div className="profile_row">
                        <h3 id="posts_header" align="center">{this.state.user_details.name}</h3>
                    </div>
                    <div className="profile_row">
                        <p>{new Date(this.state.user_details.birthday).toISOString().slice(0,10)}</p>
                    </div>
                    <div className="profile_row">
                        <p>{this.state.user_followers.length} подписчиков</p>
                    </div>
                    <div className="profile_row">
                        <p>{this.state.user_followings.length} подписок</p>
                    </div>
                    <div className="profile_row">
                        <p>{this.state.user_details.info}</p>
                    </div>
                    <div className="profile_row">
                        {this.subscribe_button()}
                    </div>
                </div>
                <div className="posts">
                    <div className="add_post_button">
                        {add_post_button}
                    </div>
                    {posts}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        is_authenticated: state.authentication.is_authenticated,
        token: state.authentication.token,
        user_id: state.authentication.user_id,
        followings: state.followings
    }
}

function mapDispatchToProps(dispatch) {
    return {
        on_subscribe_button: (to_subscribe, obj, id, token) => {
            if (to_subscribe) {
                subscribe(id, token).then((response) => {
                    if (!response.ok)
                        return;
                    dispatch(subscribe_action(id));
                    get_followers(id, token).then((response) => {
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
                    dispatch(unsubscribe_action(id));
                    get_followers(id, token).then((response) => {
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
)(ProfileComponent);

export default ProfileContainer;