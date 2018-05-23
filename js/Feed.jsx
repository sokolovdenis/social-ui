import React from "react";
import Post from "./Post";

export default class Feed extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {

        this.props.api.get('/users/me')
        .then((function (response) {
            if (response.status == 200) {
                var user_id = response.data.id;
                return this.props.api.get('/users/'+user_id+'/posts/feed');
            }
        }).bind(this))
        .then((function (response) {
            if (response.status == 200) {
                this.setState({
                    feed: response.data
                });
            }
        }).bind(this));
    }

    render() {

        return (
            this.state.feed ?

            this.state.feed.map((post, i) =>
                <Post key={i}
                    author_photo={post.user.imageUrl}
                    author_name={post.user.name}
                    date={post.dateTime}
                    content={post.text}
                    post_photo={post.imageUrl}
                />
            ) : <div></div>
        );
    }
}