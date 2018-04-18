import React, {Component} from 'react';
import {Link} from "react-router-dom";

/*
    Элемент списка всех зарегистрированных на сайте людей
 */

class PeopleListItem extends Component {
    render() {
        let user_image = <div className="fake_img" style={{height: "100px", width: "100px"}}>Image</div>;
        if (this.props.userDetails.imageUrl != null) {
            user_image =
                <img alt="" src={this.props.userDetails.imageUrl} style={{height: "100px", width: "100px"}}/>;
        }
        return (
            <div className="user">
                <div className="user_image">
                    {user_image}
                </div>
                <div className="user_info">
                    <h3><Link to={"/profile/" + this.props.userDetails.id}>{this.props.userDetails.name}</Link></h3>
                    <p className="userDetails">
                        {this.props.userDetails.birthday}
                    </p>
                </div>
            </div>
        );
    }
}

export default PeopleListItem;