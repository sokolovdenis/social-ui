import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUser, getWall, createPost } from './actions'
import PostView from './PostView'
import './css/style.css'
import './css/profile.css'

class User extends Component {  
  constructor(props) {
      super(props);
      this.state = { 
          showNewPost: this.props.uid === parseInt(this.props.match.params.userId),
          userInfo: undefined,
          userId: undefined,
          newPostText: "",
          newPostImage: null,
      };
      this.onTextChange = this.onTextChange.bind(this);
      this.onImgChange = this.onImgChange.bind(this);
      this.onPostSubmit = this.onPostSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    if(this.state.userId !== userId) {
        this.props.getUser(userId)
        this.props.getWall(userId)
        this.setState({
            userId: userId
        });
     }
    this.setState({
         showNewPost: props.uid === parseInt(userId),
         userInfo: props.userInfo
     });
  }

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.props.getUser(userId)
    this.props.getWall(userId)
    this.setState({
        userId: userId
    });
  }

  onTextChange(text) {
      this.setState({ newPostText: text });
  }

  onImgChange(img) {
    this.setState({ newPostImage: img });
  }

  onPostSubmit() {
      if( this.state.newPostText.length === 0) {
          return;
      }
      this.props.createPost({text: this.state.newPostText, image: this.state.newPostImage}, this.state.userId);
      this.setState({newPostText: ""});
  }

  render() {
    const userId = this.props.match.params.userId;
    const userInfo = this.state.userInfo;
    if(userInfo === undefined) {
        return (<div/>);
    }

    const age = new Date().getYear() - new Date(userInfo.birthday).getYear();
    const wall = this.props.wall;
    return (
      <div>
        <div className="profile">
            <div className="user">
                <img className="image" src={userInfo.imageUrl}/>
                <div className="profileInfo">
                    <div>{userInfo.name}</div>
                    {age !== undefined ? <div>{age} лет</div> : <div/> }
                </div>
            </div>
            <div className="userAbout">
                    {userInfo.info}
            </div>
        </div>
        {this.state.showNewPost ? 
        <div className="newPost">
            <textarea value={this.state.newPostText}
                onChange={(e) => this.onTextChange(e.target.value)}>
            </textarea>
            <div className="buttons">
                <button onClick={this.onPostSubmit}>Опубликовать</button>
                <input type="file" onChange={(e) => this.onImgChange(e.target.files[0])}/>
            </div>
        </div> : null}
        {
            wall !== undefined ?

            <div className="posts">
            {wall.map((object, i) => 
                <PostView postData={object} key={i} />
              )}
            </div> :

            null
        }
        
      </div>
    );
  }
}



const mapStateToProps = state => ({
    uid: state.user.uid,
    userInfo: state.user.userInfo,
    wall: state.feed.wall
});
  
const mapDispatchToProps = {
      getUser,
      getWall,
      createPost
};
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));
  