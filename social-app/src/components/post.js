import React from 'react';
import { Link } from 'react-router-dom'

import './post.css'

class Post extends React.Component {
    render() {
        const { author, content } = this.props;
        if (!author || !content) {
            return null;
        }
        return (
            <div class="post">
                <div class="post__container">
                    <img class="post__user-image" src={author.imageUrl} alt="user photo" />
                    <div>
                        <Link to={`/users/${author.id}`} class="post__user-name">{author.name}</Link>
                        <div class="post__content">{content.text}</div>
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