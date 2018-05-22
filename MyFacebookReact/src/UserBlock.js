import React, { Component } from 'react';
import './UserBlock.css';
import PostsList from './PostsList'

class UserBlock extends Component {
    constructor(props) {
        super(props);
        this.apiUrl = 'https://social-webapi.azurewebsites.net/api/';

        this.state = {
            isMe: props.isMe,
            token: props.token,
            userData: {
                id: -1,
                name: "",
                info: "",
                imageUrl: null,
                birthday: null,
                followersCount: -1,
                followingCount: -1
            },
            iFollow: false
        };        

        // firstly let's get information about ourselves and render page
        this.getUserData(this);

    }

    getUserData(self) {
        let url;
        if (this.state.isMe) {
            url = self.apiUrl + 'users/me';
        } else {
            let splitedUrl = window.location.href.toString().split('/');
            let userId = splitedUrl[splitedUrl.length - 1];

            url = self.apiUrl + 'users/' + userId;
        }
        const responsePromise = fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': "Bearer " + self.state.token
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
            .then(data => self.onUserDataAdd(data))
            .catch(function (error) {
                alert(error);
            });
    }

    // Посылает запрос за подписчиками, записываетс в state их количество с помощью onCalculateFollowersCount
    getFollowersCount() {

        if (this.state.userData.id !== -1) {

            const url = this.apiUrl + 'users/' + this.state.userData.id + '/followers';
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
                .then(data => this.onCalculateFollowersCount(data))
                .catch(function (error) {
                    alert(error);
                });
        }
    }

    // Посылает запрос за подписками, возвращает с помощью onCalculateFollowingCount их количество
    getFollowingCount() {
        if (this.state.userData.id !== -1) {

            const url = this.apiUrl + 'users/' + this.state.userData.id + '/followings';
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
                .then(data => this.onCalculateFollowingCount(data))
                .catch(function (error) {
                    alert(error);
                });
        }
    }

    onUserDataAdd(items) {
        this.state.userData = {
            id: items.id,
            name: items.name,
            info: items.info,
            imageUrl: items.imageUrl,
            birthday: items.birthday,
            followersCount: this.state.userData.followersCount,
            followingCount: this.state.userData.followingCount
        }

        this.setState({
            userData: this.state.userData
        });

        // count followers here
        this.getFollowersCount();

    }

    onCalculateFollowersCount(items) {
        this.state.userData = {
            id: this.state.userData.id,
            name: this.state.userData.name,
            info: this.state.userData.info,
            imageUrl: this.state.userData.imageUrl,
            birthday: this.state.userData.birthday,
            followersCount: items.length,
            followingCount: this.state.userData.followingCount
        }
        this.setState({
            userData: this.state.userData
        });

        // Здесь нужно бы узнать, вхожу ли я в список follower'ов
        if (!this.state.isMe) {
            this.checkIfIFollow(items);
        }

        // count following here
        this.getFollowingCount();
    }

    onCalculateFollowingCount(items) {
        this.state.userData = {
            id: this.state.userData.id,
            name: this.state.userData.name,
            info: this.state.userData.info,
            imageUrl: this.state.userData.imageUrl,
            birthday: this.state.userData.birthday,
            followersCount: this.state.userData.followersCount,
            followingCount: items.length
        };

        this.setState({
            userData: this.state.userData
        });
    }

    calculateAge(birthDate) {
        let currentDate = new Date();

        if (this.state.userData.birthday != null) {
            let currentYear = currentDate.getFullYear();
            let currentMonth = currentDate.getMonth() + 1;
            let currentDay = currentDate.getDate();

            let birthYear = Number.parseInt(this.state.userData.birthday.substring(0, 4));
            let birthMonth = Number.parseInt(this.state.userData.birthday.substring(5, 7));
            let birthDay = Number.parseInt(this.state.userData.birthday.substring(8, 10));

            let age = currentYear - birthYear - 1;

            if (currentMonth > birthMonth) {
                age = age + 1;
            }
            else if (currentMonth === birthMonth && currentDay > birthDay) {
                age = age + 1;
            }
            return age;
        }

        return 0;
    }

    handleEditMode(event) {
        event.preventDefault();

        this.props.onEditMode();
    }

    handleFollow(event) {
        event.preventDefault();

        const url = this.apiUrl + 'users/me/followings/' + this.state.userData.id;
        const responsePromise = fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': "Bearer " + this.state.token
            }
        });

        responsePromise
            .then(this.updateStateWithNewFollower())
            .catch(function (error) {
                alert(error);
            });
    }

    handleUnfollow(event) {
        event.preventDefault();

        const url = this.apiUrl + 'users/me/followings/' + this.state.userData.id;
        const responsePromise = fetch(url, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': "Bearer " + this.state.token
            }
        });

        responsePromise
            .then(this.updateStateWithDeleteFollower())
            .catch(function (error) {
                alert(error);
            });

    }

    updateStateWithNewFollower() {        
        let newFollowersCount = this.state.userData.followersCount + 1;

        this.state.userData = {
            id: this.state.userData.id,
            name: this.state.userData.name,
            info: this.state.userData.info,
            imageUrl: this.state.userData.imageUrl,
            birthday: this.state.userData.birthday,
            followersCount: newFollowersCount,
            followingCount: this.state.followingCount
        };

        this.state.iFollow = true;

        this.setState({
            userData: this.state.userData,
            iFollow: this.state.iFollow
        });

        this.getFollowingCount();
    }

    updateStateWithDeleteFollower() {
        let newFollowersCount = this.state.userData.followersCount - 1;

        this.state.userData = {
            id: this.state.userData.id,
            name: this.state.userData.name,
            info: this.state.userData.info,
            imageUrl: this.state.userData.imageUrl,
            birthday: this.state.userData.birthday,
            followersCount: newFollowersCount,
            followingCount: this.state.followingCount
        };

        this.state.iFollow = false;

        this.setState({
            userData: this.state.userData,
            iFollow: this.state.iFollow
        });

        this.getFollowingCount();
    }

    checkIfIFollow(followers) {

        // Отправить запрос, чтобы получить свой id
        const url = this.apiUrl + 'users/me';

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
            .then((data) => { this.myId = data.id; this.findMeInFollowersList(this.myId, followers); })
            .catch(function (error) {
                alert(error);
            });
    }

    findMeInFollowersList(myId, followers) {
        //alert("Going to find myself in followers list");

        for (var i = 0; i < followers.length; i++) {
            if (myId === followers[i].id) {
                //alert("I'm here!");

                this.state.iFollow = true;
                this.setState({
                    iFollow: this.state.iFollow
                })
            }
        }
    }

    

    render() {

        const posts = this.state.userData.id != -1 ? (<PostsList
            token={this.state.token}
            userId={this.state.userData.id}
            isMe={this.state.isMe}
        />) : (<p></p>)

        let form;
        if (this.state.isMe) {
            form = <form onSubmit={(event) => this.handleEditMode(event)}>
                <button type="submit" class="edit-button">Редактировать</button>
            </form>;
        } else if (this.state.iFollow) {
            form = <form onSubmit={(event) => this.handleUnfollow(event)}>
                <button type="submit" class="unfollow-button">Отписаться</button>
            </form>;
        } else {
            form = <form onSubmit={(event) => this.handleFollow(event)}>
                <button type="submit" class="follow-button">Подписаться</button>
            </form>;
        }

        return (

            <main>
                <section class="all-user-info">
                    <section class="photo-area">
                        <img src={require("./images/VanyaIvanov.jpg")} width="200" height="200" alt="profile photo" />
                    </section>
                    <section class="info-area">
                        <h2>{this.state.userData.name}</h2>
                        <p><span>Возраст: </span>{this.calculateAge(this.state.userData.birthday)}</p>
                        <p><span>Информация: </span>{this.state.userData.info}</p>
                        <p><span>Подписок: </span>{this.state.userData.followingCount}</p>
                        <p><span>Подписчиков: </span>{this.state.userData.followersCount}</p>
                        {form}
                    </section>
                </section>
                {posts}
            </main>
        );
    }
}

export default UserBlock;