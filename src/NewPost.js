import React, {Component} from 'react'
import './style.css'


class NewPost extends Component {
    render() {
        return <div className="news-container">
            <form className="form">

                <label>Text</label>
                <textarea name="text" rows="10"/>

                <label>Image</label>
                <input type="file" name="image"/>

                <input type="submit" value="Post"/>

            </form>
        </div>;
    }
}

export default NewPost;
