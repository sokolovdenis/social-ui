import React, { Component } from 'react';
import './UsersList.css';
import SmallUserInfo from './SmallUserInfo';

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.apiUrl = 'https://social-webapi.azurewebsites.net/api/';

        this.state = {
            token: props.token,

            users: []
        }

        this.getUsers();
    }

    getUsers() {
        const url = this.apiUrl + 'users';
        const responsePromise = fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': "Bearer " + this.state.token
            }
        });
        responsePromise
            .then(function (response) {
                const status = response.status;
                if (status >= 200 && status <= 299) {
                    return response.json();
                }
                else {
                    return Promise.reject(response.statusText);
                }
            })
            .then(data => this.onLoadUsers(data))
            .catch(function (error) {
                alert(error);
            });
    }

    onLoadUsers(items) {
        for (var i = 0; i < items.length; i++) {
            let curUser = {
                id: items[i].id,
                name: items[i].name,
                info: items[i].info,
                imageUrl: items[i].imageUrl,
                birthday: items[i].birthday
            }
            this.state.users.push(curUser);
        }

        this.setState({
            users: this.state.users
        });
    }

    render() {

        return (
            <main>
                <section class="users-list">
                    {this.state.users.map(user =>
                        <SmallUserInfo
                            token={this.state.token}
                            id={user.id}
                            name={user.name}
                            info={user.info}
                            imageUrl={user.imageUrl}
                            birthday={user.birthday}
                        />
                    )}
                </section>
            </main>
        );
    }
}

export default UsersList;