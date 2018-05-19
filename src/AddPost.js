import React, {Component} from 'react';

import './Feed.css';
import {connect} from "react-redux";

const mapStateToProps = state => ({
    token: state.token
});

class AddPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: "",
            errorMessage: "",
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({
            text: event.target.value
        });
    }

    onSubmit(event) {

        event.preventDefault();

        const data = {"text": this.state.text};

        let formData = new FormData(event.target);
        let file = formData.get('file');
        formData.delete('file');

        this.setState({text: ""});

        fetch('http://social-webapi.azurewebsites.net/api/users/me/posts/', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
                'content-type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {this.attachImage(data.id, file)})
            .catch(error => this.setState({error, errorMessage: error.message}));
    }

    attachImage(postId, file) {

        let formData = new FormData();
        formData.append('file', file);

        fetch(`http://social-webapi.azurewebsites.net/api/users/me/posts/${postId}/image`, {
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
                //'content-type': 'multipart/form-data'
            },
            method: 'PUT',
            body: formData,
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
    }

    render() {
        if (this.props.currentUserId === 2) {
            return (
                <div className="Feed">

                    <form encType='multipart/form-data' onSubmit={this.onSubmit}>
                        <textarea name="text" placeholder="What's new?"
                                  value={this.state.text} onChange={this.onChange} /><br />
                        <input type="file" name="file" /><br />
                        <button>Post</button>
                    </form>
                    <div className="error">{this.state.errorMessage}</div>
                </div>
            )
        } else {
            return (<div></div>)
        }
    }
}

export default connect(mapStateToProps)(AddPost);
