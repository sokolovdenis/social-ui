import React, { Component } from 'react';
import './css/style.css'
import './css/news.css'

class PostView extends Component {    
  render() {
    const postData = this.props.postData;
    const userData = postData.user;
    return (
      <div className={postData.imageUrl === null ? "post onlyText" : "post"}>
          <div className="title">
              <div className="avatar">
                  <img className="image" src={userData.imageUrl}/>
              </div>
              <div className="info">
                  <span>{userData.name}</span>
                  <span className="data">{postData.dateTime}</span>
              </div>
          </div>
          <div className="content">
              {postData.imageUrl !== null ? 
                <img className="image" src={postData.imageUrl}/> : null}
              <span>
                {postData.text}
              </span>
          </div>
      </div>
    );
  }
}


export default PostView
