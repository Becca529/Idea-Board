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

//handles clicking on cancel button when adding new idea
function handleCancelbtn(){
    $('body').on("click", ".cancel-btn", (event) => {
        (user) ? getAndDisplayIdeas() : displayWelcomeHTML('.js-content');
        });
}


//handles clicking on new idea button to display new idea form
function handleShowNewIdeaForm(){
    $('body').on("click", ".js-show-new-idea-form-btn", (event) => {
        displayNewIdeaForm($('.js-content'));
    });
}

//handles clicking on show idea details button 
function handleShowIdeaDetails(){
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


//handles clicking on edit idea button
function handleShowEditableIdeaForm(){
    $('body').on("click", ".js-show-edit-idea-form-btn", (event) => {

        const ideaID = $(event.currentTarget).data('id');
        console.log(ideaID);
        const success = response => {
            console.log("success");
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
function handleDeleteIdea(){
    $('body').on("click", "#js-delete-idea-btn", (event) => {
        const ideaID = $(event.currentTarget).data("id");
        console.log(ideaID);
        deleteIdea({jwToken: user, ideaID, onSuccess: getAndDisplayIdeas, onError: ""});
    });
}

//handles logging a user out
function handleLogOut (){
    $('body').on("click", ".js-log-out-btn", (event) => {
        console.log("logout button")
        user = null;
        username = null;
        window.location.reload();
});
}

//---------SUBMITTING FORMS------------------
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

        doNewUserCreation({
            newUserData, 
            onSuccess: displaySignUpSuccessHTML('.js-content'),
            onError: err => {
                alert('There was a problem accessing your request, please try again later.');
            }
        });
    });
   
}

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



//handles submitting a new idea form/details
function handleCreateNewIdea (){
    $('body').on("submit", "#form-new-idea", (event) => {
        event.preventDefault();
        const e = document.getElementById('status-selector');
        const statusVal = e.options[e.selectedIndex].value;
        
        
        const newIdea = {
            title: $('#title-txt').val(),
            description: $('#description-txt').val(),
            status: statusVal,
            likability: $("input[name='likability-rating']:checked").val()
        }

        createNewIdea({
            jwToken: user, 
            newIdea, 
            onSuccess: getAndDisplayIdeas,
            onError: ""
        });
    });
}

//handles submitting update idea form/details
function handleUpdateIdea (){
    $('body').on("submit", "#form-update-idea", (event) => {
        event.preventDefault();
        const ideaID = $(event.currentTarget).data('id');
        const e = document.getElementById('status-selector');
        const statusVal = e.options[e.selectedIndex].value;

        console.log(ideaID);
        const updatedIdea = {
            //id: $(event.currentTarget).data('id'),
            title: $('#title-txt').val(),
            description: $('#description-txt').val(),
            status: statusVal,
            likability: $("input[name='likability-rating']:checked").val()
    
        }
       
        console.log(updatedIdea);

        updateIdea({
            jwToken: user, 
            ideaID: ideaID,
            updatedIdea: updatedIdea, 
            onSuccess: getAndDisplayIdeas, 
            onError: ""
        });
    });
}
//add error handling


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
    handleCancelbtn ()
}