import React from "react";

export default class NewPost extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };

        this.publish = this.publish.bind(this);
    }

    publish() {
        this.props.api.post('/users/me/posts', JSON.stringify({text: this.state.text+''}));
    }

    render() {
        return (
            <div className="new_post_cont">
                <p><b style={{fontSize: '10pt'}}>Что нового?</b></p>
                <input className="post_text"
                    type="text" placeholder="Введите текст"
                    value={this.state.text}
                    onChange={(e) => this.setState({text: e.target.value})}/>
                <button className="publish_button" onClick={this.publish}>Опубликовать</button>
            </div>
        );
    }
}