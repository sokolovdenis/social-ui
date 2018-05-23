import React from 'react';
import Post from './Post'

import './PostList.css'
import './LoadMore.css'
import LoadMore from './LoadMore';

class PostList extends React.Component {
    render() {
        const loadMore = this.props.thereWillBeMore ?
            (<LoadMore onLoadMore={ () => this.props.onLoadMore() } />) : 
            null;

        return (
            <div>
                <div className="post-list">
                    { this.props.items.map(item => <Post key={ item.id } author={ item.user } content={ item }/>) }
                </div>
                { loadMore }
            </div>
        );
    }
}

export default PostList;