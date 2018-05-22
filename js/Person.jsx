import React from "react";

export default class Person extends React.Component {
    render() {
        return (
            <div className="friend">
                <img src={this.props.photo} className="post_photo"/>
                <div className="post_name_date">
                    <div className="post_name">{this.props.name}</div>
                    <div className="post_date">возраст: {this.props.age}</div>
                </div>
            </div>
        );
    }
}