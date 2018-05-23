import React from 'react';

import './EditSelf.css'
import './UserInfo.css'

class EditSelf extends React.Component {
    constructor(props) {
        super(props);
        let user = {}
        user = Object.assign(user, this.props.userInfo);
        this.state = {
            user,
            imageFile: null,
            imagePreview: this.props.userInfo.imageUrl
        }
    }

    render() {
        if (!this.props.userInfo) {
            return null;
        }
        let { id, imageUrl, name, info } = this.props.userInfo;

        const isItMe = !this.props.me ? undefined : (this.props.me.id == id);

        return (
            <div className="profile-container">
                <div className="profile-editing-picholder">
                    <label className="profile-editing-changepic" for="file-input">
                        <img className="profile-pic editing" src={ this.state.imagePreview } />
                        <div className="profile-editing-changepic-label">Change your profile photo</div>
                    </label>
                    <input id="file-input" type="file" name="pic" accept="image/*" onChange={ (event) => this.onImageSelected(event) } />
                </div>
                <form className="profile__bottom" onSubmit={(event) => this.onSubmit(event)}>
                    <input
                        className="profile__name editing"
                        type="text"
                        value={this.state.user.name}
                        placeholder="Name"
                        onChange={(event) => this.onNameChanged(event)} />

                    <input className="profile-age editing" type="date" name="birthdate" placeholder="Date of birth" />
                    
                    <textarea
                        className="profile-about editing"
                        name="about"
                        cols="30" rows="10"
                        placeholder="Information about yourself"
                        defaultValue={ info }
                        onChange={(event) => this.onInfoChanged(event)} />

                    <input className="profile-interact editing button" type="submit" value="Save" />
                    <input className="profile-interact editing button" onClick={ (event) => this.props.onCancelEditing() } value="Cancel" />
                </form>
            </div>
        );
    }

    onNameChanged(event) {
        let user = this.state.user;
        user.name = event.target.value;
        this.setState({ user });
    }

    onInfoChanged(event) {
        let user = this.state.user;
        user.info = event.target.value;
        this.setState({ user });
    }

    onImageSelected(event) {
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
        console.log(this.state.user);
        this.props.onFinishEditing({ 
            user: this.state.user,
            imageFile: this.state.imageFile
        });
    }
}

export default EditSelf;