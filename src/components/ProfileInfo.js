import React from 'react'
import PropTypes from 'prop-types'
import './Profile'

const ProfileInfo = ({ name, birthday, imageUrl, followers, followings, info }) => {
  const birthDate = new Date(birthday)
  const nowDate = new Date()
  let age = nowDate.getFullYear() - birthDate.getFullYear()
  if (nowDate.getMonth() < birthDate.getMonth() ||
    nowDate.getMonth() === birthDate.getMonth() && nowDate.getDate() < birthDate.getDate()) {
    age--
  }
  const picture = imageUrl ? imageUrl : "/img/noimg.png"

  return (
    <div className="profileInfo">
      <img src={picture} alt={name} />
      <h2>{name}</h2>
      <p className="userInfo">{info}</p>
      <p className="age">Возраст: {age} ({birthday.slice(0, 10)})</p>
      <p className="stats">Подписчиков: {followers.length}. Подписок: {followings.length}</p>
    </div>
  )
}

ProfileInfo.propTypes = {
  name: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired
}

export default ProfileInfo
