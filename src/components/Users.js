import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchUsers } from '../actions/users'
import Loading from './Loading'
import UserInList from './UserInList'
import './Users.css'

class Users extends Component {

  componentDidMount() {
    const { dispatch, token } = this.props
    dispatch(fetchUsers(token))
  }

  render() {
    const {items, history} = this.props
    const body = this.props.isFetching ? (
      <Loading />
    ) : (
      <div className="userList">{items.map(
        user => <UserInList name={user.name} pic={user.imageUrl} onclick={function(){history.push('/user/' + user.id)}} />
      )}</div>
    );
    return (
      <div>{body}</div>
    )
  }
}

Users.propTypes = {
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
}

function mapStateToProps(state) {
  const { auth, users } = state
  const { isFetching, error, items } = users
  return {
    token: auth.token,
    isFetching,
    error,
    items
  }
}

export default connect(mapStateToProps)(Users)
