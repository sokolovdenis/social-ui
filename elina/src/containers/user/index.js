import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    fetchUserData,
    fetchUserFollowers,
    fetchUserFollowings,
    fetchUserPosts

} from '../../actions';
import {
    setSelfFollowings,
    setSelfUnfollowings,
    sendPost
} from '../../utils';

import './styles.css';

const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
    'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

class User extends Component {

    constructor(props) {
        super(props);

        this.state = {
            typePosts: 0,
            addPost: 0,
            addPhoto: 0,
            addImg: 0,
            image: null,
            text: ''
        };

        this.handleImg = this.handleImg.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }

    componentDidMount() {

        const {
            fetchUserData,
            fetchUserFollowers,
            fetchUserFollowings,
            fetchUserPosts,
            user,
            users,
            match
        } = this.props;

        if (user.id) {
            if (!(users && users[match.params.id])) {
                fetchUserData(user.token, match.params.id);
                fetchUserFollowers(user.token, match.params.id);
                fetchUserFollowings(user.token, match.params.id);
                fetchUserPosts(user.token, match.params.id, 'wall');
                fetchUserPosts(user.token, match.params.id, 'feed');
            }
        }
    };

    handleImg(event) {
        event.preventDefault();
        this.setState({
            image: event.target.files[0],
        });
    }

    handlePost() {
        const { user } = this.props;
        const {
            text,
            image
        } = this.state;

        sendPost(user.token, text, image).then(() => fetchUserPosts(user.token, user.id, 'feed'));
        this.setState({
            text:'',
            image: null,
            addPost: 0,
            addPhoto: 0,
            addImg: 0,
            isLoaded: false
        });
    }

    renderFields() {
        const {
            user,
            users,
            match
        } = this.props;
        const newUser = users[match.params.id];
        const birthday = new Date(newUser.birthday);

        return (
            <div className='fields'>
                <div className='avatar'>
                    <img src={newUser.imageUrl}/>
                </div>
                <div className='info'>
                    <div className='infoBlock'>
                        <span>{newUser.name}</span>
                        <span>{`${birthday.getDate()} ${months[birthday.getMonth()]} ${birthday.getFullYear()}`}</span>
                    </div>
                    <div className='border'></div>
                    <div className='infoBlock'>
                        <span>Подписчки {newUser.followers && newUser.followers.length}</span>
                        <span>Подписки {newUser.followings && newUser.followings.length}</span>
                    </div>
                    <div className='border'></div>
                    <div className='infoText'>
                        <span>{newUser.info}</span>
                    </div>
                    {(+match.params.id !== +user.id)
                        ?
                        <div>
                            {users && users[user.id] && users[user.id].followings
                            && users[user.id].followings.find((obj) => (+obj.id === +match.params.id))
                                ?
                                <button onClick={() => setSelfUnfollowings(user.token, newUser.id)}>
                                    Отписаться
                                </button>
                                :
                                <button onClick={() => setSelfFollowings(user.token, match.params.id)}>
                                    Подписаться
                                </button>
                            }
                        </div>
                        : <div></div>
                    }
                </div>
            </div>
        )
    }

    renderButtons() {
        const {typePosts} = this.state;

        return (
            <div className='buttons'>
                <div className='border'></div>
                <div className='infoBlock'>
                    <div className={typePosts ? ' but' : 'but active'} onClick={() => this.setState({typePosts: 0})}>Мои
                        записи
                    </div>
                    <div className={typePosts ? 'but active' : 'but'} onClick={() => this.setState({typePosts: 1})}>
                        Записи друзей
                    </div>
                </div>
                <div className='border'></div>
            </div>
        )
    }

    renderPost(data, isMe, index) {
        const dataTime = new Date(data.dateTime);

        return (
            <div key={index} className='post'>
                <div className='fields'>
                    {isMe &&
                    <div className='miniavatar'>
                        <img src={data.user.imageUrl}/>
                    </div>
                    }
                    <div className='info'>
                        <div className='infoBlock' onClick={() => this.props.history.push(`/user/${data.user.id}`)}>
                            {isMe &&
                            <span>{data.user.name}</span>
                            }
                            <span>{`${dataTime.getHours()}:${dataTime.getMinutes()},
                            ${dataTime.getDate()} ${months[dataTime.getMonth()]} ${dataTime.getFullYear()}`}</span>
                        </div>
                        <div className='border'></div>
                    </div>
                </div>
                <div className='text'>
                    {data.imageUrl &&
                    <div>
                        <img src={data.imageUrl}/>
                    </div>
                    }
                    <span>
                        {data.text}
                    </span>
                    <div className='border'></div>
                </div>
            </div>

        )

    }

    renderWall(posts, isMe) {
        return (
            <div className='posts'>
                {Array.isArray(posts) && posts.map((post, index) => this.renderPost(post, isMe, index))}
            </div>
        )
    }

    renderTextarea() {
        const {
            addPost,
            addPhoto,
            addImg
        } = this.state;
        return (
            <div className='newPost'>
                <div
                    className={ addPost ? 'minibut cancel' : 'minibut add' }
                    onClick={() => this.setState({addPost: !addPost})}
                >.</div>
                {addPhoto ? <div className='imagePost'> <img src=""/> </div> : <div></div>}
                {!addPost ? <div></div> :
                    <div>
                        <textarea onChange={(event) => (this.setState({text: event.target.value}))}>
                        </textarea>
                        < div className='minibuttons'>
                            <div className='minibut photo' onClick={() => (this.setState({addImg: !addImg}))}>.</div>
                            {addImg ? <input type='file' className='newImg' name='file'
                                             onChange={this.handleImg}/> : <div></div>}
                            <div className='minibut done' onClick={this.handlePost}>.</div>
                        </div>
                    </div>
                }
            </div>
        )

    }

    render() {
        const {
            user,
            users,
            match,
            history
        } = this.props;

        const {
            typePosts
        } = this.state;

        if (user.id) {
            return (
                <div className='blockBorder'>
                    <div className='block'>
                        {users[match.params.id] && this.renderFields()}
                        {users[match.params.id] && (+match.params.id === +user.id) && this.renderTextarea()}
                        {users[match.params.id] && (+match.params.id === +user.id) ? this.renderButtons() : <div></div>}
                        {users[match.params.id] &&
                        (((+match.params.id === +user.id) && typePosts)
                                ? users[match.params.id].feed && this.renderWall(users[match.params.id].feed, true)
                                : users[match.params.id].wall && this.renderWall(users[match.params.id].wall, false)
                        )
                        }
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
        users: state.users
    }
};

const mapDispatchToProps = {
    fetchUserData,
    fetchUserFollowers,
    fetchUserFollowings,
    fetchUserPosts
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));
