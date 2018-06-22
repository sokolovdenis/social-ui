import React, {Component} from 'react';

import './Feed.css';
import {connect} from "react-redux";

const mapStateToProps = state => ({
    token: state.token,
    currentUserId: state.currentUserId,
});

class AddPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: "",
            image: null,
            errorMessage: "",
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onImgChange = this.onImgChange.bind(this);
    }

    onTextChange(event) {
        this.setState({
            text: event.target.value,
        });
    }

    onImgChange(event) {
        event.preventDefault();
        this.setState({
            image: event.target.files[0],
        });
    }

    onSubmit(event) {

        event.preventDefault();

        if (!this.state.text) {
            this.setState({errorMessage: "Please fill post text"});
            return;
        }

        this.setState({text: ""});

        fetch('http://social-webapi.azurewebsites.net/api/users/me/posts/', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
                'content-type': 'application/json'
            },
            body: JSON.stringify({"text": this.state.text}),
        })
            .then(res => res.json())
            .then(data => {
                if (this.state.image) {
                    this.attachImage(data.id, this.state.image);
                } else {
                    this.props.callback();
                }
            })
            .catch(error => this.setState({error, errorMessage: error.message}));
    }

    attachImage(postId, file) {

        let formData = new FormData();
        formData.append('imageFile', file);

        fetch(`http://social-webapi.azurewebsites.net/api/users/me/posts/${postId}/image`, {
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
            },
            method: 'PUT',
            body: formData,
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(() => this.props.callback());
    }

    render() {
        if (String(this.props.userId) === String(this.props.currentUserId)) {
            return (
                <div className="add-post">
                    <form onSubmit={this.onSubmit}>
                        <textarea name="text" className="add-post-textarea" placeholder="What's new?"
                                  value={this.state.text} onChange={this.onTextChange} /><br />
                        <input type="file" className="add-post-file" name="file"
                               onChange={this.onImgChange} /><br />
                        <button className="add-post-submit">Post</button>
                    </form>
                    <div className="global-error global-info-inline">{this.state.errorMessage}</div>
                </div>
            )
        }
        return null;
    }
}

export default connect(mapStateToProps)(AddPost);
