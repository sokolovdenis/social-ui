import React, { Component } from 'react';
import './Post.css';

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authorName: props.authorName,
            date: props.date,
            text: props.text
        }
    }

    render() {
        return (
            <article class="post">
                <h4>{this.state.authorName}</h4>
                <p><time>{this.state.date}</time></p>
                <p>{this.state.text}</p>
            </article>  
        );
    }
}

export default Post;