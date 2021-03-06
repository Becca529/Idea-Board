//EVENT HANDLER FUNCTIONS 

//---------BUTTON CLICKS------------------
//handles clicking on sign up button to display signup form
function handleShowSignUp() {
    $('body').on("click", "#js-show-sign-up-form-btn", (event) => {
        displaySignUpForm($('.js-content'));
    });
}

//handles clicking on log in button to display login form
function handleShowLogIn() {
    $('body').on("click", ".js-show-log-in-form-btn", () => {
        displayLogInForm($('.js-content'));
    });
}

//handles clicking on cancel button when adding new idea
function handleCancelbtn() {
    $('body').on("click", ".cancel-btn", () => {
        (user) ? getAndDisplayIdeas() : displayWelcomeHTML('.js-content');
    });
}

//handles clicking on new idea button to display new idea form
function handleShowNewIdeaForm() {
    $('body').on("click", ".js-show-new-idea-form-btn", () => {
        displayNewIdeaForm($('.js-content'));
    });
}

//handles clicking on show idea details button 
function handleShowIdeaDetails() {
    $('body').on("click", ".js-show-idea-details-btn", (event) => {
        const ideaID = $(event.currentTarget).data('id');
        const success = response => {
            displayIdeaDetails(response, ('.js-content'), false);
        }

        getIdeaDetails({
            jwToken: user,
            ideaID,
            onSuccess: success
        });
    });
}

//handles clicking on edit idea button to show editable idea form
function handleShowEditableIdeaForm() {
    $('body').on("click", ".js-show-edit-idea-form-btn", (event) => {
        const ideaID = $(event.currentTarget).data('id');
        const success = response => {
            displayEditableIdeaForm(response, ('.js-content'), false);
        }

        getIdeaDetails({
            jwToken: user,
            ideaID,
            onSuccess: success
        });
    });
}

//handles deleting an idea after clicking on delete button
function handleDeleteIdea() {
    $('body').on("click", ".js-delete-idea-btn", (event) => {
        var result = confirm("Are you sure you want to delete this idea?");
        if (result) {
            const ideaID = $(event.currentTarget).data('id');
            deleteIdea({ jwToken: user, ideaID, onSuccess: getAndDisplayIdeas, onError: "" });
        }
    });
}

//handles logging a user out
function handleLogOut() {
    $('body').on("click", ".js-log-out-btn", (event) => {
        user = null;
        username = null;
        window.location.reload();
    });
}

//handles clicking on home icon in nav 
function handleHomeIcon() {
    $('body').on("click", ".js-home-btn", (event) => {
        getAndDisplayIdeas();
    });
}

//---------SUBMITTING FORMS------------------
//handles submitting sign up/new user form
function handleSignUpSubmit() {
    $('body').on("submit", "#form-sign-up", (event) => {
        event.preventDefault();
        $('.form-error-messages').html('');
        const newUserData = {
            username: $('#username-txt').val(),
            password: $('#password-txt').val(),
            firstname: $('#first-name-txt').val(),
            lastname: $('#last-name-txt').val(),
            email: $('#email-txt').val()
        }

        doNewUserCreation({ 
            newUserData, 
            onSuccess: () => { 
                displaySignUpSuccessHTML('.js-content')
            },
            onError: err => {
                console.log(err.responseJSON.error);
                displayFormMessage(err.responseJSON.error, '.form-error-messages')
            }
        });
    });
}

//handles submiting Log In form 
function handleLogInSubmit() {
    $('body').on("submit", "#form-log-in", (event) => {
        event.preventDefault();
        const credentials = {
            username: $('#username-txt').val(),
            password: $('#password-txt').val()
        }
        doUserLogIn({
            credentials,
            onSuccess: getAndDisplayIdeas,
            onError: err => {
                alert('Incorrect username or password. Please try again.');
            }
        });
    });
}

//handles submitting a new idea form/details
function handleCreateNewIdea() {
    $('body').on("submit", "#form-new-idea", (event) => {
        event.preventDefault();
        const statusElement = document.getElementById('status-selector');
        const statusVal = statusElement.options[statusElement.selectedIndex].value;
        const likabilityElement = document.getElementById('likability-selector');
        const likabilityVal = likabilityElement.options[likabilityElement.selectedIndex].value;

        const newIdea = {
            title: $('#title-txt').val(),
            description: document.getElementById("description-txt").value,
            status: statusVal,
            likability: likabilityVal
        }

        createNewIdea({
            jwToken: user,
            newIdea,
            onSuccess: getAndDisplayIdeas,
            onError: ""
        });
    });
}

//handles submitting update idea form
function handleUpdateIdea() {
    $('body').on("submit", "#form-update-idea", (event) => {
        event.preventDefault();
        const ideaID = $(event.currentTarget).data('id');
        const statusElement = document.getElementById('status-selector');
        const statusVal = statusElement.options[statusElement.selectedIndex].value;
        const likabilityElement = document.getElementById('likability-selector');
        const likabilityVal = likabilityElement.options[likabilityElement.selectedIndex].value;

        const updatedIdea = {
            title: $('#title-txt').val(),
            description: document.getElementById("description-txt").value,
            status: statusVal,
            likability: likabilityVal
        }

        updateIdea({
            jwToken: user,
            ideaID,
            updatedIdea,
            onSuccess: getAndDisplayIdeas,
            onError: ""
        });
    });
}

//handles setting up all eventhandlers
function setUpEventHandlers() {
    handleShowSignUp();
    handleSignUpSubmit();
    handleShowLogIn();
    handleLogInSubmit();
    handleLogOut();
    handleShowEditableIdeaForm();
    handleShowIdeaDetails();
    handleCreateNewIdea();
    handleUpdateIdea();
    handleDeleteIdea();
    handleShowNewIdeaForm();
    handleCancelbtn();
    handleHomeIcon();
}