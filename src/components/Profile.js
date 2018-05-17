import React, { Component } from 'react'
import { connect } from 'react-redux'

import Wall from './Wall'
import Loading from './Loading'
import ProfileInfo from './ProfileInfo'
import EditPost from './EditPost'
import EditSelf from './EditSelf'
import { fetchWall, fetchNewPost } from '../actions/posts'
import { fetchProfile, editSelf } from '../actions/profile'
import { fetchMyFollowings, follow, unfollow, killSelf } from '../actions/auth'
import './Profile.css'


class Profile extends Component {
  componentDidMount() {
    const { dispatch, match, token } = this.props
    dispatch(fetchWall(match.params.id, token))
    dispatch(fetchProfile(match.params.id, token))
    dispatch(fetchMyFollowings(token))
  }

  componentDidUpdate() {
    const { dispatch, match, token } = this.props
    dispatch(fetchWall(match.params.id, token))
    dispatch(fetchProfile(match.params.id, token))
    console.log(this.props)
  }

  render() {
    const {
      articles, isFetching, history, info, followers, followings,
      myFollowings, token, dispatch, isSelf } = this.props

    const isSubscribe = !myFollowings.find(f => f == info.id)
    const onSubscribe = isSubscribe ?
      function () { dispatch(follow(info.id, token)) } :
      function () { dispatch(unfollow(info.id, token)) };
    const subscribeText = isSubscribe ? "Подписаться" : "Отписаться"
    const subscribeButton = isSelf ? "" : <input type="button" onClick={onSubscribe} value={subscribeText} />

    const addPost = isSelf ? <EditPost onsubmit={data => dispatch(fetchNewPost(data, token))} /> : ""
    const initialState = { name: info.name, birthday: info.birthday, info: info.userInfo }
    const updateSelf = isSelf ? <EditSelf initialState={initialState} onsubmit={data => dispatch(editSelf(data, token))} /> : ""
    const deleteSelf = isSelf ? (
      <input type="button" value="УДАЛИТЕ МЕНЯ" className="deleteSelf" onClick={() => dispatch(killSelf(token))} />
    ) : ""

    return (
      isFetching ?
        <Loading /> : (
          <div className="profile">
            <section className="info">
              <ProfileInfo
                name={info.name}
                birthday={info.birthday}
                imageUrl={info.imageUrl}
                followers={followers}
                followings={followings}
                info={info.userInfo} />
              {subscribeButton}
              {updateSelf}
              {deleteSelf}
            </section>
            <section className="feed">
              {addPost}
              <Wall articles={articles} history={history} />
            </section>
          </div>
        ));
  }
}

function mapStateToProps(state) {
  const { auth, posts, profile } = state
  return {
    isSelf: auth.id == profile.info.id,
    token: auth.token,
    articles: posts.items,
    isFetching: posts.isFetching || profile.isFetching || auth.isFetching,
    info: profile.info,
    followers: profile.followers,
    followings: profile.followings,
    myFollowings: auth.followings
  }
}

export default connect(mapStateToProps)(Profile)
