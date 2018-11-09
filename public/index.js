let user = null;

//ACTION FUNCTIONS
function doLogIn(credentials, success, failure){
//make function that call sucess or fail - success set user to something
}


function doSignUpUser (newUserData, onSuccess, onError) {
    const settings = { 
            type: 'POST',
            url: '/user',
            dataType: 'json',
            data: JSON.stringify(newUserData),
            success: onSuccess,
            error: err => {
                 console.error(err);
                 if (onError) {
                     onError(err);
                 }
            }
        };
        $.ajax(settings);
    }


function doLogOut(success, failure){
    
}

function getLoggedInContent(success, failure){
    
}

//GENERATOR FUNCTIONS
function generateWelcomeText() {
 $('.js-content').html (
    `<div class= "js-welcome-content">
        <h1>Welcome to Idea Board</h1>
        <h2>A place to create and store your creative juices for ideas and projects</h2>
        <button id="js-show-log-in-form-btn" type="button">Log In</button>
        <p>New user?<button id="js-show-sign-up-form-btn" type="button">Sign up</button></p>
    </div>`);
}

function generateSignUpSuccessHTML() {
    return `
    <div class= "js-account-created">
        <h1>Your account has been created successfully!</h1>
        <button id="js-show-log-in-form-btn" type="button">Log In</button>
    </div>
    `
}

function generateLogInForm(){
    return `
    <form id="form-log-in">
        <fieldset>
            <legend>Please Sign In</legend>
            <ul>
            <li><label for="username-txt">
                Username: <input id="username-txt" type="text" required>
            </label></li>
            <li><label for="password-txt">
                Password: <input id="password-txt" type="password" required>
            </label></li>
            <li><input type="submit" value="Sign In"></li>
            </ul>
        </fieldset>
    </form>
    `
}

function generateSignUpForm(){
return `
<form id="form-sign-up" method="post">
    <fieldset>
        <legend>Create an Account</legend>
        <ul>   
       <li><label for="first-name-txt">
            First Name: <input id="first-name-txt" type="text" required></label></li>
        <li><label for="last-name-txt">
            Last Name: <input id="last-name-txt" type="text" required></label></li>
        <li><label for="email-txt">
            Email: <input id="email-txt" type="email" required>
        </label></li>
        <li><label for="username-txt">
            Username: <input id="username-txt" type="text" required>
        </label></li>
        <li><label for="password-txt">
            Password: <input id="password-txt" type="password" required>
        </label></li>
        <li><button type="submit" class="primary-button form-sign-up-button" value="submit">Submit</button></li>
        </ul>
    </fieldset>
</form>
`
}

function displayIdeaBoardTitle(){
    $('.js-content').html(
    `<div class= "js-idea-board">
        <div class= "idea-board-header">
            <h1 class="idea-board-title">Idea Board</h1>
            <button class="js-show-new-idea-form-btn">Add New Idea</button>
        </div>
        <div class="js-user-ideas">
        </div>
  </div>`)
}


function generateLoggedInContent(contentData){
    //get all ideas by us
    displayLoggedInNav(); //add to display function
    displayIdeaBoardTitle(); //add to display
    const userIdeas = contentData.map((idea, index) => generateIdeaHTML(idea));
    $('.js-user-ideas').html(userIdeas);
}

function generateIdeaHTML(idea) {
   return `
   <div class = "idea">
    <ul class = "idea-board-details">
         <li class="idea-title">${idea.title}</li>
         <li class="idea-description">${idea.description}</li>
         <li class="idea-status">${idea.status}</li>
    </ul>
    <button id="js-show-idea-details-btn">View Details/Edit</button>
    </div>
   `
}

function generateLoggedInNav(){
//add user name and log out button to nav bar
$( "logged-in-nav-details" ).toggle();
}

//DISPLAY FUNCTIONS
function appendOrReplace(data, container, generator, append = true) {
    return append ? $(container).append(generator(data)) : $(container).html(generator(data));
}


function displayNav(state, container, append = false) {
   appendOrReplace(state, container, generateNav, append);
}

function displayLogInForm(container, append = false){
    appendOrReplace(null, container, generateLogInForm, append);
    
}

function displaySignUpForm(container, append = false){
    appendOrReplace(null, container, generateSignUpForm, append);
}

function displayLoggedInContent(contentData, container, append = false){
    appendOrReplace(contentData, container, generateLoggedInContent, append);
};

function displaySignUpSuccessHTML(contentData, container, append = false){
    appendOrReplace(contentData, container, generateLoggedInContent, append);
};

//EVENT HANDLER FUNCTIONS
function handleShowSignUp (){
    $('body').on("click", "#js-show-sign-up-form-btn", (event) => {
        displaySignUpForm($('.js-content'));
    });
}

function handleShowLogIn (){
    $('body').on("click", "#js-show-log-in-form-btn", (event) => {
        displayLogInForm($('.js-content'));
    });
}

function handleLogInSubmit (){
    $('body').on("submit", "#form-log-in", (event) => {
        event.preventDefault();
        const credentials = {
            username: $('#username-txt').val(),
            password: $('#password-txt').val()
        }

        logInUser(credentials, generateLoggedInContent);
//error handling? third parameter
    });
}

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

        doSignUpUser(newUserData, displaySignUpSuccessHTML);
    });
    //on failure/error? third parameter?
}

function handleLogOut (){
  
}

//HTTP REQUESTS

function logInUser(credentials, onSuccess, onError){
    const settings = { 
        type: 'POST',
        url: '/auth/login',
        dataType: 'json',
        data: JSON.stringify(credentials),
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError(err);
            }
        }
    };
    $.ajax(settings);    

}




function getUserIdeas(options){
    const { jwtToken, onSuccess, onError } = options;
    $.ajax({
        type: 'GET',
        url: '/ideaboard',
        dataType: 'json',
        data: undefined,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
        },
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError(err);
            }
        }
    });
}

function getIdeabyID(options){
    const { ideaId, onSuccess } = options;
    $.getJSON(`/ideaboard/${ideaId}`, onSuccess);
}

function createNote(options) {
    const { jwtToken, newIdea, onSuccess, onError } = options;

    $.ajax({
        type: 'POST',
        url: '/ideaboard',
        dataType: 'json',
        data: JSON.stringify(newIdea),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
        },
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError();
            }
        }
    });
}

function updateIdea(options) {
    const {jwtToken, ideaID, newIdea, onSuccess, onError } = options;

    $.ajax({
        type: 'PUT',
        url: `/idea/${ideaId}`,
        dataType: 'json',
        data: JSON.stringify(newIdea),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
        },
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError();
            }
        }
    });
}

function deleteIdea(options) {
    const { ideaId, jwtToken, onSuccess, onError } = options;
    $.ajax({
        type: 'delete',
        url: `/idea/${ideaId}`,
        dataType: 'json',
        data: undefined,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
        },
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError(err);
            }
        }
    });
}



function setUpEventHandlers(){
    handleShowSignUp();
    handleSignUpSubmit();
    handleShowLogIn();
    handleLogInSubmit();
    handleLogOut();
}

function initializeUI(){
    generateWelcomeText();
    setUpEventHandlers();
}

//when page loads call initializeUI
$(initializeUI);