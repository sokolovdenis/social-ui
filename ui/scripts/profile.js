// API Demo

Api.getMyselfInfo()
    .then(function (result) {
        alert('Your own profile info: ' + result.name);
    })
    .catch(function (reason) {
        if (reason == Api.statusCodes.AuthenticationFailed
            || reason == Api.statusCodes.NoAccessToken) {
            window.location.href = "./login.html";
        } else {
            alert(Api.description(reason));
        }
    });
