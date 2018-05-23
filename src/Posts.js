import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getFeed } from './actions'
import PostView from './PostView'
import './css/style.css'
import './css/news.css'

class Posts extends Component {  
  constructor(props) {
    super(props);
    
    this.state = {}
  }
  
  componentDidMount() {
    if(this.props.uid !== undefined) {
        this.props.getFeed(this.props.uid);
    }
  }
  
  componentWillReceiveProps(props) {
    if(props.feed === undefined && props.uid !== undefined) {
        props.getFeed(props.uid);
    }
  }
  
  render() {
    const feed = this.props.feed;
    return (
      feed !== undefined ?
       <div className="posts">
          {feed.map((object, i) => 
            <PostView postData={object} key={i} />
          )}
       </div>  : null
    );
  }
}

const mapStateToProps = state => ({
  uid: state.user.uid,
  feed: state.feed.feed
});

const mapDispatchToProps = {
  getFeed
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));
