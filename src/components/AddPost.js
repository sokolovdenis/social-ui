import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

import BaseInput from './BaseInput'

import {addPost, addPostImage} from "../api";

import style from './components.css';
import PhotoInput from "./PhotoInput";


export default class AddPost extends Component {
    state = {
        text: '',
        image: '',
        success: false
    };

    onTextChange = (value) => this.setState({text: value});
    onImageChange = (value) => this.setState({image: value});

    onFormSubmit = (event) => {
        event.preventDefault();
        const {token} = this.props.getUser();

        addPost(token, this.state.text).then(json => {
            if (this.state.image) {
                addPostImage(token, json.id, this.state.image);
            }
            this.setState({
                success: true
            })
        })
    };

    render() {
        if (this.state.success) {
            return <Redirect to={'/profile/' + this.props.getUser().userId}/>
        }

        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <h1 className="centerText">New Post</h1>
                    <PhotoInput id="image_input"
                                name="image"
                                label="Image:"
                                onChange={this.onImageChange}/>
                    <BaseInput id="text_input"
                               type="text"
                               name="text"
                               label="Text:"
                               value={this.state.name}
                               onChange={this.onTextChange}
                    />
                    <div className="submit_row">
                        <input type="submit" value="Post"/>
                    </div>
                </form>
            </div>
        );
    }
}
