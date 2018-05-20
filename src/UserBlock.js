import React from 'react'
import {Link} from 'react-router-dom'
import './style.css'

import {API_URL} from './settings'
import {get_token} from "./auth";

function check_code(response) {
    if (response.status !== 200) {
        return;
    }
    return response;
}


function get_subscribe(id) {
    function subscribe(event) {
        const url = API_URL + 'users/me/followings/' + id;
        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + get_token(),
            }
        })
            .then(response => check_code(response))
            .catch(function (error) {
                console.log('Request failed', error)
            });
    }

    return subscribe;
}

const UserBlock = ({name, birthday, imageUrl, followers, followings, info, id}) => {
    const birthDate = new Date(birthday);

    let ul = null;
    if (followers != null && followings != null) {
        ul = <ul>
            <li>Birthday {birthDate.getDay()}.{birthDate.getMonth()}.{birthDate.getFullYear()}</li>
            <li>{followers} followers</li>
            <li>{followings} followings</li>
        </ul>;
    } else {
        ul = <ul>
            <li>Birthday {birthDate.getDay()}.{birthDate.getMonth()}.{birthDate.getFullYear()}</li>
        </ul>
    }

    return <div className="info">
        <div className="info-header">
            <img src={imageUrl}/>
            <div className="info-header-text">
                <Link to={'/user/' + id}>
                    <div className="name">{name}</div>
                </Link>
                <div className="text-info">
                    {ul}
                </div>
                <form onSubmit={get_subscribe(id)}>
                    <input type="submit" value="Подписаться"/>
                </form>
            </div>
        </div>
        <p>
            {info}
        </p>
    </div>;
};

export default UserBlock;
