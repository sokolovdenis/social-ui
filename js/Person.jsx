import React from "react";
import {Redirect} from 'react-router-dom';


export default class Person extends React.Component {

    constructor(props) {
        super(props);

        this.state = {redirect: false};
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={"/users/"+this.props.id}/>;
        }

        return (
            <div className="friend">
                <img src={this.props.photo} className="post_photo"
                    onClick={(e) => this.setState({redirect: true})}/>
                <div className="post_name_date">
                    <div className="post_name">{this.props.name}</div>
                    <div className="post_date">возраст: {this.props.age}</div>
                </div>
                <div className="sub_cont">
                    <button className="sub" onClick={this.props.subscribe}>sub</button>
                    <button className="sub" onClick={this.props.unsubscribe}>unsub</button>
                </div>
            </div>
        );
    }
}