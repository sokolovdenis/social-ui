import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import {add_post, attach_image} from "../webapi";

import './add_post.css';

class AddPostComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: undefined,
            text: "",
            redirect: false,
            sending: false
        };
        this.add_post_handler = this.add_post_handler.bind(this);
        this.handle_input_change = this.handle_input_change.bind(this);
        this.handle_image_change = this.handle_image_change.bind(this);
    }

    handle_input_change(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handle_image_change(event) {
        this.setState({
            image: event.target.files[0]
        });
    }

    add_post_handler(event) {
        event.preventDefault();
        this.setState({
            sending: true
        });
        add_post(this.props.token, this.state.text).then((response) => {
            if (!response.ok)
                return;
            response.json().then((json) => {
                let post_id = json.id;
                if (this.state.image !== undefined){
                    attach_image(this.props.token, post_id, this.state.image).then((response) => {
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
        document.title = "Новый пост";
        if (this.state.redirect) {
            return <Redirect to={'/profile/' + String(this.props.user_id)}/>;
        }
        return (
            <main>
                <div className="flex_row">
                    <form onSubmit={this.add_post_handler}>
                        <div className="add_post_form">
                            <h3>Новый пост</h3>
                            <div className="input_row flex_row">
                                <textarea
                                    id="text_input"
                                    name="text"
                                    value={this.state.text}
                                    onChange={this.handle_input_change}/>
                            </div>
                            <div className="image_row flex_row">
                                <input
                                    type="file"
                                    id="image_input"
                                    name="image"
                                    onChange={this.handle_image_change}
                                    accept="image/*"/>
                            </div>
                            <div className="submit_row flex_row">
                                <input type="submit" value="Опубликовать" disabled={this.state.sending}/>
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
        is_authenticated: state.authentication.is_authenticated,
        user_id: state.authentication.user_id,
        token: state.authentication.token
    }
}

const AddPostContainer = connect(
    mapStateToProps
)(AddPostComponent);

export default AddPostContainer;