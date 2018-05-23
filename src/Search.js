import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { allUsers, updateCurrentUser } from './actions'
import UserView from './UserView'
import './css/style.css'
import './css/search.css'

class Search extends Component {  
  constructor(props) {
        super(props);
        this.state = { filter: "" };
  }
  
  componentDidMount() {
    this.props.allUsers();
  }
  
  render() {
    const props = this.props;
    const state = this.state;
    return (
      <div className="search">
          <form className="form">
              <input type="text" required value={this.state.filter}
                onChange={(e) => this.setState({ filter: e.target.value})}/>
              <button type="submit"><img src="/css/images/search.png"/></button>
          </form>
          {
            props.usersData !== undefined && props.followingIds !== undefined ?
            <div className="users">
              {
                props.usersData.map(function(object, i){
                      return (state.filter.length == 0 || object.name.indexOf(state.filter) !== -1) ?
                       <UserView userData={object} followed={props.followingIds.has(object.id)} key={i}/> : null;
                  })} 
            </div> :null
          }
            
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.user.uid,
  usersData: state.user.allUsersData,
  followingIds: state.user.followingIds,
});

const mapDispatchToProps = {
  allUsers,
  updateCurrentUser
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
