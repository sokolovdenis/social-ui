import React, {Component} from 'react'
import {Redirect} from "react-router-dom";

import './components.css';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            remember: false
        };
    }

    render() {
        if (this.props.isAuth) {
            return <Redirect to={{
                pathname: "/user_profile/" + String(this.props.userId)
            }}/>
        }
        return (
            <main>
                <div className="flex_row sign_in_row">
                    <div className="welcome_text_div">
                        <p className="welcome_text_big">Social UI</p>
                        <p className="welcome_text_small"> for DIHT ABBYY Frontend course
                        </p>
                    </div>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        this.props.SignInCallback(this.state);
                    }}>
                        <div className="authentication">
                            <div className="input_row">
                                <h3><label htmlFor="email_input">Email:</label></h3>
                                <input id="email_input"
                                       type="text"
                                       name="email"
                                       value={this.state.email}
                                       onChange={this.handleInput}/>
                            </div>
                            <div className="input_row">
                                <h3><label htmlFor="password_input">Password:</label></h3>
                                <input id="password_input"
                                       type="password"
                                       name="password"
                                       value={this.state.password}
                                       onChange={this.handleInput}/>
                            </div>
                            <div className="submit_row">
                                <input type="submit" value="Sign In"/>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        );
    }

    handleInput = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

}

export default SignIn