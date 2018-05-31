import React, {Component} from 'react'
import {Redirect} from "react-router-dom"

class SignUp extends Component {
    state = {
            email: "",
            password: "",
            name: "",
            date: ""
    };

    render() {
        if (this.props.isAuth) {
            return <Redirect to={{
                pathname: "/user_profile/" + String(this.props.userId)
            }}/>
        }
        return (
            <main>
                <div className="flex_row">
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        this.props.SignUpCallback(this.state);
                    }}>
                        <div className="authentication">
                            <h3>JOIN US!</h3>
                            <div className="input_row">
                                <h4><label htmlFor="name_input">Name:</label></h4>
                                <input id="name_input"
                                       type="text"
                                       name="name"
                                       placeholder="username"
                                       value={this.state.name}
                                       onChange={this.handleInput}/>
                            </div>
                            <div className="input_row">
                                <h4><label htmlFor="email_input">Email:</label></h4>
                                <input id="email_input"
                                       type="text"
                                       name="email"
                                       value={this.state.email}
                                       placeholder="you@example.com"
                                       onChange={this.handleInput}/>
                            </div>
                            <div className="input_row">
                                <h4><label htmlFor="password_input">Password:</label></h4>
                                <input id="password_input"
                                       type="password"
                                       name="password"
                                       placeholder="password"
                                       value={this.state.password}
                                       onChange={this.handleInput}/>
                            </div>

                            <div className="input_row">
                                <h4><label htmlFor="date_input">Birthday:</label></h4>
                                <input id="date_input"
                                       type="date"
                                       name="Birthday"
                                       value={this.state.date}
                                       onChange={this.handleDate}/>
                            </div>
                            <div className="submit_row">
                                <input type="submit" value="Sign Up"/>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        )
    };

    handleInput = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };

    handleDate = (event) => {
        this.setState({
            date: event.target.value
        });
    };
}

export default SignUp