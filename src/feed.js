import React from 'react';
import { browserHistory } from 'react-router';
import Api from './api';
import HeaderForm from './header';

let FEED_PAGE_SIZE = 20;

export default class FeedForm extends React.Component {
  constructor(props) {
    super(props);
    if (!Api.getAuthToken()) {
      browserHistory.push('/login');
    }
    this.state = {
      userId: props.id,
      type: props.type,
      page: 0,
      posts: []
    };
    if (props.type !== 'wall') {
      let self = this;
      Api.get('/users/me')
        .then(response => self.setState({ userId: response.data.id, type: 'feed' }, self.loadPosts));
    } else {
      this.loadPosts();
    }
    
    this.renderPost = this.renderPost.bind(this);
    this.postHeader = this.postHeader.bind(this);
    this.loadNextPage = this.loadNextPage.bind(this);
  }
  
  loadPosts() {
    let self = this;
    Api.get('/users/' + self.state.userId + '/posts/' + self.state.type
            + '?skip=' + (self.state.page * FEED_PAGE_SIZE) + '&count=' + FEED_PAGE_SIZE)
      .then(response => self.setState({ posts: self.state.posts.concat(response.data) }));
  }
  
  header() {
    if (this.state.type === 'wall') {
      return (<span></span>);
    }
    return (
      <div>
        <HeaderForm />
        <h2 className="title">News Feed</h2>
      </div>
    );
  }
  
  postHeader(post) {
    if (this.state.type === 'wall') {
      return (<span></span>);
    }
    return (
      <div className="post-header">
        <img className="avatar-small" alt="avatar"
          src={post.user.imageUrl ? post.user.imageUrl : Api.ALT_AVATAR_LINK}/>
        <div className="inline-box">
          {post.user.name}
        </div>
        <hr/>
      </div>
    );
  }
  
  postImage(post) {
    if (!post.imageUrl) {
      return (<span></span>);
    }
    return (
      <img className="post-image" src={post.imageUrl} alt="postImage"/>
    );
  }
    
  
  renderPost(post) {
    return (
      <div className="post" key={post.id}>
        {this.postHeader(post)}
        <div className="post-text">{post.text}</div>
        {this.postImage(post)}
        <div className="post-time">{post.dateTime}</div>
      </div>
    );  
  }
  
  loadNextPage() {
    let self = this;
    self.setState({ page: self.state.page + 1 }, self.loadPosts);
  } 
        

  render() {
    return (
      <div>
        {this.header()}
        <div className="container">
          {this.state.posts.map(this.renderPost)}
          <button type="button" onClick={this.loadNextPage}>Load More</button>
        </div>
      </div>
    );
  }
}
