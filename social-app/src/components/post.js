import React from 'react';
import { Link } from 'react-router-dom'

import './post.css'
import default_userpic from '../assets/default_userpic.jpg';

class Post extends React.Component {
    render() {
        const { author, content } = this.props;
        if (!author || !content) {
            return null;
        }
        if (!author.imageUrl) {
            author.imageUrl = default_userpic;
        }
        return (
            <div className="post">
                <div className="post__container">
                    <Link to={`/users/${author.id}`}>
                        <img class="post__user-image" src={author.imageUrl} alt="user photo" />
                    </Link>
                    <div className="post-main">
                        <Link to={`/users/${author.id}`} class="post__user-name">{author.name}</Link>
                        <div className="post__content">{content.text}</div>
                        <PostImage url={ content.imageUrl } />
                    </div>
                </div>
            </div>
        );
    }
}

const PostImage = (prop) => {
    const url = prop.url;
    if (!url) {
        return null;
    }
    return (<img class="post__image" src={url} alt="Post image" />);
}

export default Post;