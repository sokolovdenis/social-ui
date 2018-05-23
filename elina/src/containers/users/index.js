import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    fetchUsers,
    fetchUserData,
    fetchUserFollowers,
    fetchUserFollowings,
    fetchUserPosts,
    setTypePosts
} from '../../actions';
import {
    setSelfUnfollowings,
    setSelfFollowings
} from '../../utils'

import './styles.css';

const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
    'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

class Users extends Component {

    componentWillMount() {
        const {
            fetchUsers,
            fetchUserData,
            fetchUserFollowers,
            fetchUserFollowings,
            fetchUserPosts,
            user,
            users,
            setTypePosts
        } = this.props;

        if (user.id) {
            fetchUsers(user.token);
            setTypePosts({typePosts: 1});

            if (!(users && users[user.id])) {
                fetchUserData(user.token, user.id);
                fetchUserFollowers(user.token, user.id);
                fetchUserFollowings(user.token, user.id);
                fetchUserPosts(user.token, user.id, 'wall');
                fetchUserPosts(user.token, user.id, 'feed');
            }
        }
    };

    renderFields(newUser, index) {
        const {
            user,
            users,
            history
        } = this.props;

        const birthday = new Date(newUser.birthday);

        return (
            <div className='fieldBlock' key={index * 100}>
                <div className='field'>
                    <div className='miniavatar'>
                        <img src={newUser.imageUrl}/>
                    </div>
                    <div className='infoUser'>
                        <div onClick={() => history.push(`/user/${newUser.id}`)}>{newUser.name}</div>
                        <div>{`${birthday.getDate()} ${months[birthday.getMonth()]} ${birthday.getFullYear()}`}</div>
                    </div>
                    <div className='infoFoll'>
                        {<div>
                            {users && users[user.id] && Array.isArray(users[user.id].followings)
                            && users[user.id].followings.find((obj) => (+obj.id === +newUser.id))
                                ?
                                <button onClick={() => setSelfUnfollowings(user.token, newUser.id)}>
                                    Отписаться
                                </button>
                                :
                                <button onClick={() => setSelfFollowings(user.token, newUser.id)}>
                                    Подписаться
                                </button>
                            }
                        </div>}
                    </div>
                </div>
                <div className='border'></div>
            </div>
        )
    }

    renderList(users) {
        return (
            <div className='usersList'>
                {users && users.map((user, index) => this.renderFields(user, index))}
            </div>
        )
    }

    render() {
        const {
            user,
            users,
            usersList,
            setTypePosts,
            match,
            history
        } = this.props;

        if (user.id) {
            return (
                <div className='blockBorder'>
                    <div className='block'>
                        {users[user.id] &&
                        <div className='buttons'>
                            <div className='border'></div>
                            <div className='infoBlock'>
                                <div className={user.typePosts === 1 ? 'but active' : 'but'}
                                     onClick={() => setTypePosts({typePosts: 1})}>Пользователи
                                </div>
                                <div className={user.typePosts === 2 ? 'but active' : 'but'}
                                     onClick={() => setTypePosts({typePosts: 2})}>Подписки
                                </div>
                                <div className={user.typePosts === 3 ? 'but active' : 'but'}
                                     onClick={() => setTypePosts({typePosts: 3})}>Подписчики
                                </div>
                            </div>
                            <div className='border'></div>
                            {usersList[1] && (user.typePosts === 1 ? this.renderList(usersList) : <div></div>)}
                            {users[user.id].followings && (user.typePosts === 2 ? this.renderList(users[user.id].followings) :
                                <div></div>)}
                            {users[user.id].followers && (user.typePosts === 3 ? this.renderList(users[user.id].followers) :
                                <div></div>)}
                        </div>}
                    </div>


                </div>
            )
        }
        else {
            history.push(`/login`);
            return (
                <div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        users: state.users,
        usersList: state.usersList,
        typePosts: state.typePosts
    }
};

const mapDispatchToProps = {
    fetchUsers,
    fetchUserData,
    fetchUserFollowers,
    fetchUserFollowings,
    fetchUserPosts,
    setTypePosts
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users));
