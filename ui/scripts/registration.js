// import Api from './api';

function getRegistrationData() {
    return JSON.stringify({
        "email": document.querySelector("#registration-form-email").value,
        "password": document.querySelector("#registration-form-password").value,
        "name": document.querySelector("#registration-form-name").value,
        "birthday": document.querySelector("#registration-form-date").value
    });
}

document.querySelector('#registration-form').addEventListener('submit', function (event) {
    event.preventDefault();

    let payload = getRegistrationData();
    console.log(payload);

    Api.register(payload)
        .then(function () {
            window.location.href = "./login.html";
        });
});
