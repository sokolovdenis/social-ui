import React from 'react';

import Api from '../Api'

import './CreatePost.css'
import uploadImageLogo from '../assets/upload_image_icon.svg';

class CreatePost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            limit: 500,
            imagePreview: null,
            imageFile: null
        }
    }

    render() {
        const restLimit = this.state.limit - this.state.text.length;
        let limitCounterClass = "create-port__limit-counter";
        if (restLimit < 0) {
            limitCounterClass += " create-port__limit-counter--over-limit";
        }
        return (
            <form onSubmit={(event) => this.onSubmit(event)} className="create-post">
                <textarea className={ "create-post__textatea" + ((this.state.text) ? " create-post__textatea--with-content" : "")}
                    value={this.state.text}
                    placeholder="What is happening?"
                    onChange={(event) => this.handleChange(event)} >
                </textarea>
                <div className={limitCounterClass}>{restLimit}</div>
                <ImagePreview src={this.state.imagePreview} />
                <div className="create-post__bottom">
                    <div className="upload-image">
                        <label className="upload-image__label" htmlFor="upload-image__file-input">
                            <img className="upload-image__icon" src={ uploadImageLogo } alt="Upload photo button" />
                        </label>
                        <input id="upload-image__file-input" type="file" name="image" accept="image/*" onChange={ (event) => this.handleImageSelected(event) } />
                    </div>
                    <input className="create-post__submit" type="submit" value="Post" />
                </div>
            </form>
        );
    }

    handleChange(event) {
        this.setState({ text: event.target.value });
    }

    handleImageSelected(event) {
        let target = event.target || window.event.srcElement
        let files = target.files;
        this.setState({ imageFile: files[0] })

        let fileReader = new FileReader();
        const rememberThis = this;
        fileReader.onload = function () {
            rememberThis.setState({ imagePreview: fileReader.result });
        }
        fileReader.readAsDataURL(files[0]);
    }

    async onSubmit(event) {
        event.preventDefault();
        if (this.state.text.length > this.state.limit) {
            return;
        }

        const created = await this.createPost({
            text: this.state.text,
            imageFile: this.state.imageFile
        });

        this.props.onPostCreated(created);

        this.setState({
            text: "",
            imagePreview: null,
            imageFile: null
        });
    }

    async createPost(data) {
        if (!data || !data.text) {
            return;
        }
        console.log(data);
        let created = await Api.createPost(data.text)
        console.log('Created initial:');
        console.log(created);
        if (data.imageFile) {
            created = await Api.attachImage(created.id, data.imageFile);
        }
        console.log('Created after upload:');
        console.log(created);
        return created;
    }
}

function ImagePreview(props) {
    if (props.src) {
        return (<img src={props.src} className="create-post__image-preview" alt="preview" />);
    } else {
        return null;
    } 
}

export default CreatePost;