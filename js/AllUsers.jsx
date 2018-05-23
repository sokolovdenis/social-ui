import React from "react";
import Person from "./Person";

export default class AllUsers extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {
        this.props.api.get('/users')
        .then((function (response) {
            if (response.status == 200) {
                this.setState({
                    users: response.data
                });
            }
        }).bind(this));
    }

    subscribe(user_id) {
        this.props.api.post('users/me/followings/'+user_id);
    }

    unsubscribe(user_id) {
        this.props.api.delete('users/me/followings/'+user_id);
    }

    render() {
        return (
            this.state.users ?
                <div style={{width: '100%'}}>
                    <div className="friends_cnt_label"><b>{this.state.users.length}</b> пользователей</div>
                    {this.state.users.map((friend, i) =>
                    <Person key={i} id={friend.id}
                        photo={friend.imageUrl || "static/no-user.png"}
                        name={friend.name}
                        age={this.props.get_age(friend.birthday)}
                        subscribe={() => this.subscribe(friend.id)}
                        unsubscribe={() => this.unsubscribe(friend.id)}/>)}
                </div>
            :
                <div></div>
        );
    }
}