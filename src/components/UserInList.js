import React from 'react'
import './Users.css'

const UserInList = ({name, pic, onclick}) => {
  const picture = pic ? pic : "/img/noimg.png"
  return (
    <div class="userInList" onClick={onclick}><img src={picture} alt={name}/><p>{name}</p></div>
  )
}

export default UserInList