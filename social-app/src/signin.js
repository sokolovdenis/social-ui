// import Api from './api';

function getSignInData() {
    return JSON.stringify({
        "email": document.querySelector("#login-form-email").value,
        "password": document.querySelector("#login-form-password").value,
    });
}

document.querySelector('#login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    Api.signIn(getSignInData())
        .then(function () {
            window.location.href = "./profile.html";
            alert(sessionStorage.getItem('token'));
        })
        .catch(function (reason) {
            alert('Failed to log in: ' + Api.description(reason));
        });
});