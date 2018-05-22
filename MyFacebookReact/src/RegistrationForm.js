import React from 'react';
import './RegistrationForm.css';

class RegistrationForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.apiUrl = 'https://social-webapi.azurewebsites.net/api/';
    }

    handleSignupSubmit(event) {
        event.preventDefault();

        const userSignUpData = {
            email: this.signupEmail.value,
            password: this.signupPassword.value,
            name: this.signupName.value,
            birthday: this.signupBirthday.value
        }

        const url = this.apiUrl + 'identity/signup';

        const responsePromise = fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userSignUpData)
        });

        responsePromise
            .then(function (response) {
                const status = response.status;
                if (status >= 200 && status <= 299) {
                    return response.json();
                }
                else {
                    return Promise.reject(response.statusText);
                }
            })
            .then(userSignUpData => this.props.onTokenAdd(userSignUpData.token))
            .catch(function (error) {
                alert(error);
            });
    }

    handleSinginSubmit(event) {
        let signInRemember = this.refs.signInRemember.checked; // TODO! think about it

        event.preventDefault();

        const userSignInData = {
            email: this.signinEmail.value,
            password: this.signinPassword.value,
        };

        const url = this.apiUrl + 'identity/signin';

        const responsePromise = fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userSignInData)
        });

        responsePromise
            .then(function (response) {
                const status = response.status;
                if (status >= 200 && status <= 299) {
                    return response.json();
                }
                else {
                    return Promise.reject(response.statusText);
                }
            })
            .then(userSignInData => this.props.onTokenAdd(userSignInData.token))
            .catch(function (error) {
                alert(error);
            });
    }

    render() {
        return (
            <div class="container">
                <div class="form-container">
                    <h1>Вход</h1>
                    <form onSubmit={(event) => this.handleSinginSubmit(event)} id="signin-form">
                        <input type="email" placeholder="email" id="signin-email" ref={input => this.signinEmail = input}/>
                        <input type="password" placeholder="password" id="signin-password" ref={input => this.signinPassword = input} />
                        <label><input type="checkbox" ref="signInRemember" />Запомнить</label>  
                        <input type="submit" value="Войти" class="form-button" />
                    </form>
                </div>

                <div class="form-container" id="signup-form-container">
                    <h1>Регистрация</h1>
                    <form onSubmit={(event) => this.handleSignupSubmit(event)} id="signup-form">
                        <input type="email" placeholder="email" id="signup-email" ref={input => this.signupEmail = input}/>
                        <input type="password" placeholder="password" id="signup-password" ref={input => this.signupPassword = input}/>
                        <input type="text" placeholder="name" id="signup-name" ref={input => this.signupName = input}/>
                        <input type="date" placeholder="birthday" id="signup-birthday" ref={input => this.signupBirthday = input} />
                        <input type="submit" value="Зарегистрироваться" class="form-button" />
                    </form>
                </div>
                <div class="token" id="auth-result">
                </div>
            </div>
        );
    }
}

export default RegistrationForm;