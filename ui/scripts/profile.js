// API Demo

Api.getMyselfInfo()
    .then(function (result) {
        alert('Your own profile info: ' + result.name);
    })
    .catch(function (reason) {
        alert(reason);
    });
