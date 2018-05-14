import React, {Component} from 'react';
import {connect} from "react-redux";

import PostComponent from './post'
import {get_feed} from '../webapi'

import './feed.css';

class FeedComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_loaded: false,
            posts: []
        };
        this.load_posts = this.load_posts.bind(this);
    }

    load_posts() {
        get_feed(this.props.user_id, this.props.token).then((response) => {
            if (!response.ok)
                return;
            response.json().then((json) => {
                this.setState({
                    is_loaded: true,
                    posts: json
                });
            });
        });
    }

    render() {
        document.title = "Лента";
        if (!this.state.is_loaded) {
            this.load_posts()
        }
        let posts = this.state.posts.map((x) => {
            return <PostComponent post_details={x} key={x.id}/>
        });
        return (
            <div className="main">
                <div className="feed">
                    <div className="content_header">
                        <h3 align="center">Лента</h3>
                    </div>
                    {posts}
                </div>
                <div className="side_column"/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: state.authentication.token,
        user_id: state.authentication.user_id
    }
}

const FeedContainer = connect(
    mapStateToProps
)(FeedComponent);

export default FeedContainer;