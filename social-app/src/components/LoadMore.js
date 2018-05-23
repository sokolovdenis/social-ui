import React from 'react';
import './LoadMore.css'

class LoadMore extends React.Component {

    componentDidMount() {
        const callback = this.props.onLoadMore;
        let alreadyTriggered = false;
        let oldHeight = document.documentElement.offsetHeight;
        window.onscroll = function () {
            var d = document.documentElement;
            var offset = d.scrollTop + window.innerHeight;
            var height = d.offsetHeight;

            if (height != oldHeight) {
                alreadyTriggered = false;
            }

            if (offset >= height && !alreadyTriggered) {
                console.log('At the bottom');
                callback(this);
                alreadyTriggered = true;
                oldHeight = height;
            }
        }
    }

    render() {
        return ( <div className="load-more button" onClick={ () => this.props.onLoadMore() }>Load more</div>);
    }
}

export default LoadMore;