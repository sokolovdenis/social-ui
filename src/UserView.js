import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { follow, unfollow } from './actions'
import './css/style.css'
import './css/search.css'

class UserView extends Component {  
  constructor(props) {
    super(props);
    this.state = {};
    
    this.subscribe = this.subscribe.bind(this);
  }
  
  subscribe() {
    if(this.props.followed) {
       this.props.unfollow(this.props.userData.id, this.props.myUid);
    } else {
       this.props.follow(this.props.userData.id, this.props.myUid);
    }
  }
  
  render() {
    const userData = this.props.userData;
    return (
      <div className="user">
        <Link to={"/user/" + userData.id}>
          <div className="avatar">
              { 
                userData.imageUrl !== null ? <img className="image" src={userData.imageUrl}/> : <img className="image" src="./images/pics01.jpg"/> 
              }
          </div>
        </Link>
        <div className="info">
            <Link to={"/user/" + userData.id}>
              <span>{userData.name}</span>
            </Link>
            <button className="sub-button" onClick={this.subscribe}>{!this.props.followed ? 'Подписаться' : 'Отписаться'}</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  myUid: state.user.uid
});

const mapDispatchToProps = {
  follow,
  unfollow
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserView))
