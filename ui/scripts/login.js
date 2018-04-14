// import Api from './api';

function getLoginData() {
    return JSON.stringify({
        "email": document.querySelector("#login-form-email").value,
        "password": document.querySelector("#login-form-password").value,
    });
}

document.querySelector('#login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    Api.login(getLoginData())
        .then(function () {
            window.location.href = "./index.html";
            alert(sessionStorage.getItem('token'));
        })
        .catch(function (reason) {
            alert('Failed to log in: ' + reason);
        });
});