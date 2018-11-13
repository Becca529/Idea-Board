//EVENT HANDLER FUNCTIONS 

//---------BUTTON CLICKS------------------
//handles clicking on sign up button to display signup form
function handleShowSignUp (){
    $('body').on("click", "#js-show-sign-up-form-btn", (event) => {
        displaySignUpForm($('.js-content'));
    });
}

//handles clicking on log in button to display login form
function handleShowLogIn (){
    $('body').on("click", ".js-show-log-in-form-btn", (event) => {
        displayLogInForm($('.js-content'));
    });
}

//handles clicking on new idea button to display new idea form
function handleShowNewIdeaForm(){
    $('body').on("click", ".js-show-new-idea-form-btn", (event) => {
        console.log("before displa")
        displayNewIdeaForm($('.js-content'));
    });
}

//handles clicking on show idea details button 
function handleShowIdeaDetails(){
    $('body').on("click", ".js-show-idea-details-btn", (event) => {
        //how to I pass updated idea and webtoken
        const ideaID = $(event.currentTarget).data("id");
        getIdeaDetails(user, ideaID, displayIdeaDetails);
    });
}

//handles clicking on edit idea button
function handleShowEditableIdeaForm(){
    $('body').on("click", ".js-show-edit-idea-form-btn", (event) => {
        const ideaID = $(event.currentTarget).data("id");
        getIdeaDetails(jwToken, ideaID, displayEditableIdeaForm); 
    });
}

//handles deleting an idea after clicking on delete button
function handleDeleteIdea(){
    $('body').on("click", "#js-delete-idea-btn", (event) => {
        //how to I pass updated idea and webtoken
        const ideaID = $(event.currentTarget).data("id");
        deleteIdea(jwToken, ideaID, displayLoggedInContent);
    });
}

//handles logging a user out
function handleLogOut (){
    $('#logout-btn').click(event => {
        // Delete Authenticated User Function- how?
});
}

//---------SUBMITTING FORMS------------------
//handles submiting Log In form 
function handleLogInSubmit (){
    $('body').on("submit", "#form-log-in", (event) => {
        event.preventDefault();
        const credentials = {
            username: $('#username-txt').val(),
            password: $('#password-txt').val()
        }
        doUserLogIn(credentials, getAndDisplayIdeas);
    });
}

//handles submitting sign up/new user form
function handleSignUpSubmit (){
    $('body').on("submit", "#form-sign-up", (event) => {
        event.preventDefault();
        const newUserData = {
            username: $('#username-txt').val(),
            password: $('#password-txt').val(),
            firstName: $('#first-name-txt').val(),
            lastName: $('#last-name-txt').val(),
            email: $('#email-txt').val()
        }
        console.log(JSON.parse(JSON.stringify(newUserData)));

        doNewUserCreation({newUserData, displaySignUpSuccessHTML, 
            onError: err => {
            alert('There was a problem accessing your request, please try again later.');
            }
        });
    });
   
}

//handles submitting a new idea form/details
function handleCreateNewIdea (){
    $('body').on("submit", "#form-new-idea", (event) => {
        event.preventDefault();
        
        const newIdeaData = {
            title: $('#title-txt').val(),
            description: $('#description-txt').val(),
            status: $('#status-selector').val(),
            likability: $('#likability-radio').val(),
        }
        createNewIdea(jwToken, newIdeaData, displayLoggedInContent);
    });
}

//handles submitting update idea form/details
function handleUpdateIdea (){
    $('body').on("submit", "#form-update-idea", (event) => {
        event.preventDefault();
        
        const updatedIdeaData = {
            title: $('#title-txt').val(),
            description: $('#description-txt').val(),
            status: $('#status-options').val(),
            likability: $('#likability-radio').val(),
    
        }
        updateIdea(jwToken, updatedIdeaData, displayLoggedInContent);
    });
}


function setUpEventHandlers(){
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
}