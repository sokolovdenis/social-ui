// // API Demo

// Api.getMyself()
//     .then(function (result) {
//         // alert('Your own profile info: ' + result.name);
//         alert(result.id);
//     })
//     .catch(function (reason) {
//         if (reason == Api.statusCodes.AuthenticationFailed ||
//             reason == Api.statusCodes.NoAccessToken) {
//             window.location.href = "./login.html";
//         } else {
//             alert(Api.description(reason));
//         }
//     });

// Api.getUsersFollowers(26)
//     .then(followers => {
//         alert(followers[0].name);
//     })

// Api.getAllUsers()
//     .then(function (users) {
//         alert('Tolal users count: ' + users.length);
//         console.log(users);
//     }).catch(function (reason) {
//         if (reason == Api.statusCodes.AuthenticationFailed ||
//             reason == Api.statusCodes.NoAccessToken) {
//             window.location.href = "./login.html";
//         } else {
//             alert(Api.description(reason));
//         }
//     });

// let userInfo = {};
// const id = 1;

// Api.getUser(id)
//     .then(function (user) {
//         userInfo.info = user;
//         console.log(user);
//         return Api.getUsersFollowings(id);
//     }).then(function (followings) {
//         userInfo.followings = followings;
//         console.log(followings);
//         return Api.getUsersFollowers(id);
//     }).then(function (followers) {
//         userInfo.followers = followers;
//         console.log(followers);
//         alert(`User with id: ${userInfo.info.id} is ${userInfo.info.name} with ${userInfo.followings.length} followings and ${userInfo.followers.length} followers`);
//     })
//     .catch(function (reason) {
//         if (reason == Api.statusCodes.AuthenticationFailed ||
//             reason == Api.statusCodes.NoAccessToken) {
//             window.location.href = "./login.html";
//         } else {
//             alert(Api.description(reason));
//         }
//     });

// Api.getMyself().then(function (me) {
//         return Api.getUserPosts(me.id);
//     })
//     .then(function (myPosts) {
//         console.log(myPosts);
//         alert(`I have written ${myPosts.length} posts`);
//     })
//     .catch(function (reason) {
//         if (reason == Api.statusCodes.AuthenticationFailed ||
//             reason == Api.statusCodes.NoAccessToken) {
//             window.location.href = "./login.html";
//         } else {
//             alert(Api.description(reason));
//         }
//     });


// Api.getUserPosts(id, 0, 10)
//     .then(function (posts) {
//         console.log(posts);
//         alert(`User ${id} has written ${posts.length} posts`);
//     }).catch(function (reason) {
//         if (reason == Api.statusCodes.AuthenticationFailed ||
//             reason == Api.statusCodes.NoAccessToken) {
//             window.location.href = "./login.html";
//         } else {
//             alert(Api.description(reason));
//         }
//     });

// Api.editMyself({
//     name: 'Maksim',
//     info: 'My personal info',
//     birthday: '2018-04-14T20:01:34.203Z'
// }).then(function () {
//     return Api.getMyself();
// }).then(function (me) {
//     alert('My new name is ' + me.name);
// }).catch(function (reason) {
//     if (reason == Api.statusCodes.AuthenticationFailed ||
//         reason == Api.statusCodes.NoAccessToken) {
//         window.location.href = "./login.html";
//     } else {
//         alert(Api.description(reason));
//     }
// });

// Api.createPost('My first post')
//     .then(function (post) {
//         console.log(post);
//         alert(`My first post is about: '${post.text}'`)
//     }).catch(function (reason) {
//         if (reason == Api.statusCodes.AuthenticationFailed ||
//             reason == Api.statusCodes.NoAccessToken) {
//             window.location.href = "./login.html";
//         } else {
//             alert(Api.description(reason));
//         }
//     });

const id = 27;

// alert('!!');

Api.follow(id).then(function() {
    alert(`Following ${id}`);
}).catch(function(reason) {
    if (reason == Api.statusCodes.AuthenticationFailed ||
        reason == Api.statusCodes.NoAccessToken) {
        window.location.href = "./login.html";
    } else {
        alert(Api.description(reason));
    }
})