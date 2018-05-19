import React from 'react'
import './style.css'


const UserBlock = ({name, birthday, imageUrl, followers, followings, info}) => {
    const birthDate = new Date(birthday);

    return <div className="info">
        <div className="info-header">
            <img src={imageUrl}/>
            <div className="info-header-text">
                <div className="name">{name}</div>
                <div className="text-info">
                    <ul>
                        <li>Birthday {birthDate.getDay()}.{birthDate.getMonth()}.{birthDate.getFullYear()}</li>
                        <li>{followers} followers</li>
                        <li>{followings} followings</li>
                    </ul>
                </div>
                <form>
                    <input type="button" value="Подписаться"/>
                </form>
            </div>
        </div>
        <p>
            {info}
        </p>
    </div>;
};

export default UserBlock;
