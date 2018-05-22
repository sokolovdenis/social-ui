import React from 'react';
import './LoadMore.css'

class LoadMore extends React.Component {

    render() {
        return ( <div className="load-more button" onClick={ () => this.props.onLoadMore() }>Load more</div>);
    }
}

export default LoadMore;