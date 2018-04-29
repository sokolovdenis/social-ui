import React from 'react';

import './CreatePost.css'
import uploadImageLogo from '../assets/upload_image_icon.svg';

class CreatePost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            image: null,
        }
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

    onSubmit(event) {
        event.preventDefault();

        this.props.onSubmitHandler(this.state);

        this.setState({
            text: "",
            imagePreview: null,
            imageFile: null
        });
    }

    render() {
        return (
            <form onSubmit={(event) => this.onSubmit(event)} className="create-post">
                <textarea class="create-post__textatea"
                    value={this.state.text}
                    placeholder="What is happening?"
                    onChange={(event) => this.handleChange(event)} >
                </textarea>
                <ImagePreview src={this.state.imagePreview} />
                <div class="create-post__bottom">
                    <div class="upload-image">
                        <label class="upload-image__label" htmlFor="upload-image__file-input">
                            <img class="upload-image__icon" src={ uploadImageLogo } alt="Upload photo button" />
                        </label>
                        <input id="upload-image__file-input" type="file" name="image" accept="image/*" onChange={ (event) => this.handleImageSelected(event) }/>
                    </div>
                    <input class="create-post__submit" type="submit" value="Post" />
                </div>
            </form>
        );
    }
}

function ImagePreview(props) {
    if (props.src) {
        return (<img src={props.src} className="create-post__image-preview" />);
    } else {
        return null;
    } 
}

export default CreatePost;