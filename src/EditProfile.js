import React, {Component} from 'react'
import './style.css'


class EditProfile extends Component {
    render() {
        return <div className="news-container">
            <form className="form">
                <label>Name</label>
                <input type="text" name="name"/>

                <label>Birthday</label>
                <input type="date" name="birthday"/>

                <label>Info</label>
                <input type="text" name="info"/>

                <label>Avatar</label>
                <input type="file" name="avatar"/>

                <input type="submit" value="Save"/>

            </form>
        </div>;
    }
}

export default EditProfile;
