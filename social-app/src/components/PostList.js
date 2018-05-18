import React from 'react';
import Post from './post'

import './PostList.css'

class PostList extends React.Component {
    render() {
        return (
            <div className="post-list">
                { this.props.items.map(item => <Post key={ item.id } author={ item.user } content={ item }/>) }
            </div>
        );
    }
}

export default PostList;