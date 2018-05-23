import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import {
    logOut,
    fetchMeData,
    login,
    fetchUserData,
    fetchUserFollowers,
    fetchUserFollowings,
    fetchUserPosts
} from '../../actions';

import './styles.css';


class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.hadleClick = this.hadleClick.bind(this);
        this.handleOutput = this.handleOutput.bind(this);
    }

    componentWillMount () {
        const {
            cookies,
            user,
            login,
            fetchMeData,
            fetchUserData,
            fetchUserFollowers,
            fetchUserFollowings,
            fetchUserPosts
        } = this.props;

        const token = cookies.get('token');

        if (!user.name && token) {
            login(token)
                .then(
                    () => {
                        return fetchMeData(token)
                            .then((id) => {
                                return Promise.all([
                                    fetchUserData(token, id),
                                    fetchUserFollowers(token, id),
                                    fetchUserFollowings(token, id),
                                    fetchUserPosts(token, id, 'wall'),
                                    fetchUserPosts(token, id, 'feed')
                                ])
                                    .then((data) => {
                                        this.props.history.push(`/user/${data[4]}`)
                                    })
                                    .catch((err) => {
                                        this.setState({ error: err.message })
                                    });
                            }).catch((err) => {
                                this.setState({ error: err.message })
                            });
                    },
                    (err) => {
                        if (err.code === 400) {
                            this.setState({ error: err.message })
                        }
                    }
                ).catch((err) => {
                    this.setState({error: err.message});
                }
            )
        }

    }

    hadleClick(path) {
        return () =>  {
            if (this.props.user.id) {
                this.props.history.push(`/${path}`);
            }
            else {
                this.props.history.push(`/login`);
            }
        };
    }

    handleOutput() {
        this.props.logOut();
        this.props.history.push(`/login`);
        this.props.cookies.remove('token', { path: '/' });
    }

    renderSidebar() {
        const {user} = this.props;

        return (
            <div className="sidebar">
                <div className="icons">
                    <ul>
                        <li>
                            <div className="icon a" onClick={this.hadleClick(`user/${user.id}`)}>
                            </div>
                        </li>
                        <li>
                            <div className="icon c" onClick={this.hadleClick('users')}>
                            </div>
                        </li>
                        <li>
                            <div className="icon d" onClick={this.handleOutput}>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="links">
                    <ul>
                        <li>
                            <div className="link" onClick={this.hadleClick(`user/${user.id}`)}><br/>{user.name}</div>
                        </li>
                        <li>
                            <div className="link" onClick={this.hadleClick('users')}><br/>Люди</div>
                        </li>
                        <li>
                            <div className="link" onClick={this.handleOutput}><br/>Выход</div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    render() {
        const {
            user,
            match,
            history
        } = this.props;

        if (user.id) {
            return (
                <div>
                    {user.id && this.renderSidebar()}
                </div>
            )
        }
        else {
            if (match.location && (match.location.pathname !== `/login`)) {
                history.push(`/login`);
            }

            return (
                <div>
                </div>
            );
        }
    }

}

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = {
    logOut,
    login,
    fetchMeData,
    fetchUserData,
    fetchUserFollowers,
    fetchUserFollowings,
    fetchUserPosts
};

export default withCookies(withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar)));