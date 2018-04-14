// import Api from './api';

function getLoginData() {
    return JSON.stringify({
        "email": document.querySelector("#login-form-email").value,
        "password": document.querySelector("#login-form-password").value,
    });
}

let api = new Api();

document.querySelector('#login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    let payload = getLoginData();
    console.log(payload);

    Api.login(payload)
        .then(function () {
            window.location.href = "./index.html";
            alert(sessionStorage.getItem('token'));
        })
        .catch(function() {
            alert('Failed to log in.');
        })
});