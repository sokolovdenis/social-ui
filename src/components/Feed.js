import React, {Component} from 'react';
import {connect} from "react-redux";

import PostListItem from './PostListItem'
import {getFeed} from '../api'

import './components.css';

/*
    Страница постов подписок пользователя (его Feed)
 */

class FeedPresentation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            posts: []
        };
        this.loadPosts = this.loadPosts.bind(this);
    }

    loadPosts() {
        getFeed(this.props.userId, this.props.token).then((response) => {
            if (!response.ok)
                return;
            response.json().then((json) => {
                this.setState({
                    isLoaded: true,
                    posts: json
                });
            });
        });
    }

    componentDidMount() {
        document.title = "Friends - Your Feed";
    }

    render() {
        if (!this.state.isLoaded) {
            this.loadPosts()
        }
        let posts = this.state.posts.map((x) => {
            return <PostListItem postDetails={x} key={x.id}/>
        });
        return (
            <main>
                <div className="side_column"/>
                <div className="content_column">
                    <div className="content_header">
                        <h1 align="center">Feed</h1>
                    </div>
                    {posts}
                </div>
                <div className="side_column"/>
            </main>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: state.authentication.token,
        userId: state.authentication.userId
    }
}

const FeedContainer = connect(
    mapStateToProps
)(FeedPresentation);

export default FeedContainer;