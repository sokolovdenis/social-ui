import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {get_users} from '../webapi'

import './people.css';

class PersonComponent extends Component {
    render() {
        let user_image = "";
        if (this.props.user_details.imageUrl != null) {
            user_image =
                <img className="user_image" alt="" src={this.props.user_details.imageUrl}/>;
        }
        return (
            <div className="user">
                <div className="user_image">
                    {user_image}
                </div>
                <div className="user_info">
                    <Link to={"/profile/" + this.props.user_details.id}>{this.props.user_details.name}</Link>
                    <p className="user_details">
                        {new Date(this.props.user_details.birthday).toISOString().slice(0, 10)}
                    </p>
                </div>
            </div>
        );
    }
}

class PeopleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_loaded: false,
            users: []
        };
        this.load_users = this.load_users.bind(this);
    }

    load_users() {
        get_users(this.props.token).then((response) => {
            response.json().then((json) => {
                this.setState({
                    is_loaded: true,
                    users: json
                })
            });
        });
    }

    render() {
        document.title = "Люди";
        if (!this.state.is_loaded) {
            this.load_users()
        }
        let users = this.state.users.map((x) => {
            return <PersonComponent user_details={x} key={x.id}/>
        });
        return (
            <div className="main">
                <div className="users">
                    {users}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: state.authentication.token
    }
}

const PeopleContainer = connect(
    mapStateToProps
)(PeopleComponent);

export default PeopleContainer;