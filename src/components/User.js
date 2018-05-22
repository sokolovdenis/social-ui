import React, {Component} from 'react';
import {Link} from "react-router-dom";

import Moment from 'react-moment'


class User extends Component {
    render() {
        const {imageUrl, id, birthday, name} = this.props.info;
        let avatarUrl = imageUrl || 'https://flipagram.com/assets/resources/img/fg-avatar-anonymous-user-retina.png';
        return (
            <div className="user">
                <div className="user_image">
                    <img src={avatarUrl} alt="" style={{height: "300px", width: "300px"}}/>
                </div>
                <div className="user_info">
                    <h3><Link to={"/profile/" + id}>{name}</Link></h3>
                    <p className="userDetails">
                        <Moment format="D MMMM YYYY">{birthday}</Moment>
                    </p>
                </div>
            </div>
        );
    }
}

export default User;