import React from 'react';
import Post from './post'

import '../style.css'

class PostList extends React.Component {
    render() {
        if (!this.props.items) {
            return (<div>Loading...</div>)
        }
        return (
            <div class="post-list">
                { this.props.items.map(item => <Post key={ item.id } author={item.user} content={item}/>) }
            </div>
        );
    }
}

export default PostList;