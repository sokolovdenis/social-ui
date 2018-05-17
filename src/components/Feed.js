import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchFeed } from '../actions/posts'

import './App.css';
import Wall from './Wall'
import Loading from './Loading';

class Feed extends Component {
  componentDidMount() {
    const { dispatch, token, userId } = this.props
    dispatch(fetchFeed(userId, token))
    console.log(this.props)
  }

  render() {
    const { articles, isFetching, history } = this.props
    return (
      isFetching ? <Loading /> : <Wall articles={articles} history={history} />
    );
  }
}

function mapStateToProps(state) {
  const { auth, posts } = state
  return {
    token: auth.token,
    userId: auth.id,
    articles: posts.items,
    isFetching: posts.isFetching
  }
}

export default connect(mapStateToProps)(Feed)
