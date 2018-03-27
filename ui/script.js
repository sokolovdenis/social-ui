let state = 0;
let viewOther = document.getElementById("state-is-view-other");
let viewOwner = document.getElementById("state-is-view-owner");
let editOwner = document.getElementById("state-is-edit-owner");

let createPostFromHeaderForm = document.getElementById("create-post-from-header-form");

function changeState(newState) {
    state = newState;
    if (state == 0) {
        viewOther.style.display = "flex"
        viewOwner.style.display = "none"
        editOwner.style.display = "none"
    }
    if (state == 1) {
        viewOther.style.display = "none"
        viewOwner.style.display = "flex"
        editOwner.style.display = "none"
    }
    if (state == 2) {
        viewOther.style.display = "none"
        viewOwner.style.display = "none"
        editOwner.style.display = "flex"
    }
}

function onSubmitProfileEditHandler(event) {
    alert('Changes has been sent to server!');
    changeState(1);
}

function onCreateFromHeaderButtonHandler(event) {
    createPostFromHeaderForm.style.display = "flex";
}

function onSubmitPost(event) {
    alert("Your post has been sent to server");
}

function setupEventListeners() {
    let editProfileButton = document.getElementById("edit-profile-button")
    editProfileButton.addEventListener('click', function (event) {
        console.log(event);
        changeState(2);
    });

    let saveProfileButton = document.getElementById("save-profile-button");
    saveProfileButton.addEventListener('click', onSubmitProfileEditHandler);

    let createPostFromHeaderButton = document.getElementById("create-post-header-button");
    createPostFromHeaderButton.addEventListener('click', onCreateFromHeaderButtonHandler);

    let submitPostButtons = document.querySelectorAll(".create-post__submit");
    for (button of submitPostButtons) {
        button.addEventListener('click', onSubmitPost);
    }
}

setupEventListeners();
changeState(1);