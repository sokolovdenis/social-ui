import React from 'react';
import { browserHistory } from 'react-router';
import Api from './api';
import HeaderForm from './header';

let FEED_PAGE_SIZE = 5;

export default class FeedForm extends React.Component {
  constructor(props) {
    super(props);
    if (!Api.getAuthToken()) {
      browserHistory.push('/login');
    }
    this.state = {
      userId: props.id,
      isOwned: false,
      type: props.type,
      page: 0,
      newPostText: '',
      posts: []
    };
    let self = this;
    Api.get('/users/me')
      .then(response => {
        if (props.type !== 'wall') {
          self.setState({ userId: response.data.id, type: 'feed' }, self.loadPosts);
        } else {
          self.setState({ isOwned: self.state.userId === response.data.id.toString() }, self.loadPosts);
        }
      });
    
    this.renderPost = this.renderPost.bind(this);
    this.postHeader = this.postHeader.bind(this);
    this.loadNextPage = this.loadNextPage.bind(this);
    this.handleNewPostTextChange = this.handleNewPostTextChange.bind(this);
    this.handleNewPost = this.handleNewPost.bind(this);
    this.addNewPost = this.addNewPost.bind(this);
  }
  
  loadPosts() {
    let self = this;
    Api.get('/users/' + self.state.userId + '/posts/' + self.state.type
            + '?skip=' + (self.state.page * FEED_PAGE_SIZE) + '&count=' + FEED_PAGE_SIZE)
      .then(response => self.setState({ posts: self.state.posts.concat(response.data) }));
  }
  
  handleNewPostTextChange(event) {
    this.setState({ newPostText: event.target.value });
  }
  
  handleNewPost() {
    let self = this;
    Api.post('/users/me/posts', { text: self.state.newPostText })
      .then(response => {
          if (document.getElementById('new-post-image').files.length > 0) {
            var data = new FormData();
            data.append('file', document.getElementById('new-post-image').files[0]);
            Api.put('/users/me/posts/' + response.data.id + '/image', data)
              .then(response => self.addNewPost(response.data));
          } else {
            self.addNewPost(response.data);
          }
        });
  }
  
  addNewPost(post) {
    this.setState({ posts: [post].concat(this.state.posts.slice(0, (this.state.page + 1) * FEED_PAGE_SIZE - 1)) });
  }
  
  
  header() {
    if (this.state.type === 'wall') {
      if (!this.state.isOwned) {
        return (<h2 className="title">User Posts</h2>);
      }
      return (
        <div>
          <h2 className="title">Add New Post</h2>
          <form className="container">
            <label>
              Post text:
              <br/>
              <textarea placeholder="write your news here" value={this.state.newPostText}
                onChange={this.handleNewPostTextChange} rows="6" cols="45"/>
              <br/>
              Attach image:
              <input type="file" id="new-post-image" accept="image/*"/>
            </label>
            <br/>
            <button type="button" onClick={this.handleNewPost}>Submit</button>
          </form>
          <hr/>
          <h2 className="title">Your Posts</h2>
        </div>
      );
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
