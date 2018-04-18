import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import {addPost, addPostImage} from "../api";

import './components.css';

/*
    Страница добавления нового поста
 */

class AddPostPagePresentation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: undefined,
            text: "",
            redirect: false,
            sending: false
        };
        this.addNewPost = this.addNewPost.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleImageChange(event) {
        this.setState({
            image: event.target.files[0]
        });
    }

    addNewPost(event) {
        event.preventDefault();
        this.setState({
            sending: true
        });
        addPost(this.props.token, this.state.text).then((response) => {
            if (!response.ok)
                return;
            response.json().then((json) => {
                let postId = json.id;
                if (this.state.image !== undefined){
                    addPostImage(this.props.token, postId, this.state.image).then((response) => {
                        if (response.ok) {
                            this.setState({
                                redirect: true
                            })
                        }
                    })
                }
                else {
                    this.setState({
                        redirect: true
                    })
                }
            });
        })
    }

    render() {
        document.title = "Friends - Add Post";
        if (this.state.redirect) {
            return <Redirect to={'/profile/' + String(this.props.userId)}/>;
        }
        return (
            <main>
                <div className="flex_row">
                    <form onSubmit={this.addNewPost}>
                        <div className="authentication_form">
                            <h3>Add new Post</h3>
                            <div className="input_row">
                                <h4><label htmlFor="text_input">Text:</label></h4>
                                <textarea
                                    id="text_input"
                                    name="text"
                                    value={this.state.text}
                                    onChange={this.handleInputChange}/>
                            </div>
                            <div className="input_row">
                                <h4><label htmlFor="image_input">Image:</label></h4>
                                <input
                                    type="file"
                                    id="image_input"
                                    name="image"
                                    onChange={this.handleImageChange}
                                    accept="image/*"/>
                            </div>
                            <div className="submit_row">
                                <input type="submit" value="Publish" disabled={this.state.sending}/>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        userId: state.authentication.userId,
        token: state.authentication.token
    }
}

const AddPostPageContainer = connect(
    mapStateToProps
)(AddPostPagePresentation);

export default AddPostPageContainer;