import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import {
    identityIn,
    login,
    fetchMeData,
    fetchUserData,
    fetchUserFollowers,
    fetchUserFollowings,
    fetchUserPosts
} from '../../actions';

import './styles.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            remember: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    };

    componentDidMount() {
        const {
            cookies,
            user
        } = this.props;

        const token = cookies.get('token');

        this.setState({
            email: cookies && cookies.get('email'),
            password: cookies && cookies.get('password')
        });

        if (!user.feed && token) {
            this.loginAll(token)
        }

    };

    loginAll(token) {
        const {
            login,
            fetchMeData,
            fetchUserData,
            fetchUserFollowers,
            fetchUserFollowings,
            fetchUserPosts
        } = this.props;

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
                                .then((data) =>
                                {
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

    onSubmit(event) {
        const {
            email,
            password,
            remember
        } = this.state;

        const {
            identityIn,
            cookies
        } = this.props;

        event.preventDefault();
        identityIn({email, password}).then(
            (token) => {
                if (remember) {
                    cookies.set('token', token, { path: '/' });
                }

                this.loginAll(token);
            },
            (err) => {
                if (err.code === 400) {
                    this.setState({ error: err.message })
                }
            }
        );
    };

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    };

    onChangeCheckbox(event) {
        this.setState({ [event.target.name]: event.target.checked });
    };

    render() {
        const {
            email,
            password,
            error
        } = this.state;

        return (
            <div className='blockBorder'>
                <div className='block'>
                    <form className='loginForm' onSubmit={this.onSubmit} >
                        <div className='input'>
                            <label>
                                <span>E-mail</span>
                                <input type='text'
                                       name='email'
                                       id='email'
                                       size='25'
                                       required=''
                                       autoFocus=''
                                       value={email}
                                       onChange={this.onChange}
                                />
                            </label>
                        </div>

                        <div className='input'>
                            <label>
                                <span>Пароль</span>
                                <input type='password'
                                       name='password'
                                       id='password'
                                       value={password}
                                       size='25'
                                       maxLength='30'
                                       required=''
                                       onChange={this.onChange}
                                />
                            </label>
                        </div>

                        <div className='check'>
                            <label>
                                <input
                                    id='remember'
                                    className=''
                                    type='checkbox'
                                    name='remember'
                                    onChange={this.onChangeCheckbox}
                                />Запомнить меня
                            </label>
                        </div>

                        <div className={error ? 'error' : 'absent'}>
                            {error.toString()}
                        </div>

                        <div className='butt'>
                            <div className=''>
                                <button type='submit' className='button'>Вход</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    };
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = {
    identityIn,
    login,
    fetchMeData,
    fetchUserData,
    fetchUserFollowers,
    fetchUserFollowings,
    fetchUserPosts
};

export default withCookies(withRouter(connect(mapStateToProps, mapDispatchToProps)(Login)));