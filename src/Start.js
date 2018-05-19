import React, {Component} from 'react';
import { connect } from 'react-redux';
import { setToken } from './actions/actions';
import './Start.css';

const mapStateToProps = state => ({
    token: state.token
});

class Start extends Component {

    constructor(props) {
        super(props);

        this.state = {
            postId: null,
            errorMessage: "",
            doRemember: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event, type) {

        event.preventDefault();

        let formData = new FormData(event.target);

        let data = {};
        let this_ = this;
        formData.forEach(function(value, key) {
            if (key !== "remember") {
                data[key] = value;
            } else {
                this_.setState({doRemember: true});
            }
        });

        formData.forEach(function(value, key) {
            formData.delete(key);
        });

        fetch('http://social-webapi.azurewebsites.net/api/identity/' + type, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                this.setState({data, token: data.token});
                console.log(data.token);
                this.props.dispatch(setToken(data.token, this.state.doRemember));
            })
            .catch(error => {console.log(error); this.setState({error, errorMessage: error.message})});
    }

    render() {
        if (!this.props.token) {

            return (
                <div className="Start">

                    Sign up
                    <form onSubmit={(event) => this.onSubmit(event, 'signup')}>
                        <input type="email" name="email" placeholder="E-mail"/><br/>
                        <input type="password" name="password" placeholder="Password"/><br/>
                        <input type="name" name="name" placeholder="Full name"/><br/>
                        <input type="date" name="birthday" placeholder="Birthday"/><br/>
                        <input type="checkbox" name="remember" defaultChecked/> Запомнить<br/>
                        <button>Sign up</button>
                    </form>
                    <div className="error">{this.state.errorMessage}</div>

                    Sign in
                    <form onSubmit={(event) => this.onSubmit(event, 'signin')}>
                        <input type="email" name="email" placeholder="E-mail"/><br/>
                        <input type="password" name="password" placeholder="Password"/><br/>
                        <input type="checkbox" name="remember" defaultChecked/> Запомнить<br/>
                        <button>Sign in</button>
                    </form>
                    <div className="error">{this.state.errorMessage}</div>
                </div>
            );
        }
        return null;
    }
}

export default connect(mapStateToProps)(Start);
