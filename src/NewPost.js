import React, {Component} from 'react'
import './style.css'
import {get_token, login} from "./auth";
import {API_URL} from "./settings";

function check_code(response) {
    if (response.status !== 200) {
        alert('hz');
        return;
    }
    return response.json();
}

function post_img(state, id) {
    if (state.img) {
        let formData = new FormData();
        formData.append('imageFile', state.img);

        fetch(API_URL + 'users/me/posts/' + id + '/image', {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + get_token(),
            },
            body: formData
        })
            .then(response => check_code(response))
            .catch(function (error) {
                console.log('Request failed', error)
            });
    }
}

function post_post(state) {
    fetch(API_URL + 'users/me/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + get_token(),
        },
        body: JSON.stringify({
            text: state.text
        })
    })
        .then(response => check_code(response))
        .then(json => post_img(state, json.id))
        .catch(function (error) {
            console.log('Request failed', error)
        });
}

class NewPost extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            img: ''
        };

        this.text_change = this.text_change.bind(this);
        this.img_change = this.img_change.bind(this);
        this.submit = this.submit.bind(this);
    }

    submit(event) {
        event.preventDefault();

        post_post(this.state);
        this.setState({
            text: '',
            img: '',
        });
    }

    text_change(event) {
        const value = event.target.value;

        this.setState({
            text: value
        });
    }

    img_change(event) {
        const value = event.target.files[0];

        this.setState({
            img: value
        });
    }

    render() {
        return <div className="news-container">
            <form className="form" onSubmit={this.submit}>

                <label>Text</label>
                <textarea name="text" rows="10" value={this.state.text} required onChange={this.text_change}/>

                <label>Image</label>
                <input type="file" name="image" onChange={this.img_change}/>

                <input type="submit" value="Post"/>

            </form>
        </div>;
    }
}

export default NewPost;
