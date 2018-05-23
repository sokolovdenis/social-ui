﻿// Здесь будет рендериться блок типа как пост но просто с информацией о пользователе. Должно быть несложно
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SmallUserInfo.css';

class SmallUserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            name: props.name,
            info: props.info,
            imageUrl: props.imageUrl,
            birthday: props.birthday
        }
    }

    render() {

        let image;

        if (this.state.imageUrl !== null) {
            image = <img src={this.state.imageUrl} width="80" height="80" alt="profile photo" />;
        }

        return (
            <article class="user-info">
                {image}
                <h4>{this.state.name}</h4>
                <p>Дата рождения: <time>{this.state.birthday}</time></p>
                <p>{this.state.info}</p>
                <form>
                    <Link to={'/user/' + this.state.id}>Профиль</Link>
                </form>
            </article>
        );
    }
}

export default SmallUserInfo;