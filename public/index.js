let user = null;

//ACTION FUNCTIONS
//HTTP REQUESTS
//creates new user through POST /api/user endpoint
function doNewUserCreation (newUserData, onSuccess, onError) {
    const settings = { 
            type: 'POST',
            url: '/user',
            contentType: 'application/json',
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

//Sends user credentails through POST /api/auth/login endpoint
function doUserLogIn(credentials, onSuccess, onError){
    const settings = { 
            type: 'POST',
            url: '/auth/login',
            contentType: 'application/json',
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

//Retrieves logged in user's ideas using GET /api/idea/board endpoint    
function doUserIdeaListRetrival (options){
    const { jwtToken, onSuccess, onError } = options;
    $.ajax({
        type: 'GET',
        url: '/board',
        contentType: 'application/json',
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

//Creates a new idea using POST /api/idea endpoint
function doNewIdeaCreation (options){
    const { jwtToken, newIdea, onSuccess, onError } = options;
    $.ajax({
        type: 'POST',
        url: '/idea',
        contentType: 'application/json',
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
//Retrieves specific user idea details using GET /api/idea/:ideaid endpoint
function doSpecificIdeaRetrival (options){
    const {ideaId, onSuccess } = options;
    $.getJSON(`/idea/${ideaId}`, onSuccess);
}

//Update specific user idea using PUT /api/idea/:ideaid endpoint
function doIdeaUpdate (options){
    const {jwtToken, ideaId, newIdea, onSuccess, onError } = options;
    $.ajax({
        type: 'PUT',
        url: `/idea/${ideaId}`,
        contentType: 'application/json',
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

//Deletes specific user idea using DELETE /api/idea/:ideaid endpoint
function doIdeaDeletion (options){
    const { jwtToken, ideaId, onSuccess, onError } = options;
    $.ajax({
        type: 'DELETE',
        url: `/idea/${ideaId}`,
        contentType: 'application/json',
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

function doUserLogOut(onSuccess, onError){
    
}

//GENERATOR FUNCTIONS-------------------------------------

function generateWelcomeHTML() {
 return `
    <div class= "js-welcome-content">
        <h1>Welcome to Idea Board</h1>
        <h2>A place to create and store your creative juices for ideas and projects</h2>
        <button class="js-show-log-in-form-btn" type="button">Log In</button>
        <p>New user?<button id="js-show-sign-up-form-btn" type="button">Sign up</button></p>
    </div>
    `
}

function generateSignUpSuccessHTML() {
    return `
    <div class= "js-account-created">
        <h1>Your account has been created successfully!</h1>
        <button class="js-show-log-in-form-btn" type="button">Log In</button>
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

function generateIdeaBoardTitleHTML(){
  return `
    <div class= "js-idea-board">
        <div class= "idea-board-header">
            <h1 class="idea-board-title">Idea Board</h1>
            <button class="js-show-new-idea-form-btn">Add New Idea</button>
        </div>
        <div class="js-user-ideas">
        </div>
  </div>
  `
}

function generateIdeaSummaryHTML(idea) {
   return `
   <div class = "idea-summary-box">
    <ul class = "idea-summary">
         <li class="idea-title">${idea.title}</li>
         <li class="idea-status">${idea.status}</li>
         <li class="idea-likeability">${idea.likability}</li>
    </ul>
    <button id="js-show-idea-details-btn">View Details/Edit</button>
    </div>
   `
}

function generateLoggedInNav(){
//add user name and log out button to nav bar
$( "logged-in-nav-details" ).toggle();
}

function generateIdeaDetails(idea) {
    return `
    <div class = "idea-detailed-box">
     <ul class = "idea-detailed">
          <li class="idea-title">${idea.title}</li>
          <li class="idea-status">${idea.status}</li>
          <li class="idea-likeability">${idea.likability}</li>
          <li class="idea-description">${idea.description}</li>
     </ul>
     <button id="js-show-edit-idea-form-btn">Edit</button>
     <button id="js-delete-idea-btn">Delete</button>
     </div>
    `
 }
//review how to review and display data in different type of inputs ie status button radio button, text (placeholder or value or selected)
 function generateEditableIdeaForm(idea){
    return `
    <form id="form-update-idea" method="put">
        <fieldset>
            <legend>Update Idea Details</legend>
            <ul>   
           <li><label for="title-txt">
                First Name: <input id="title-txt" type="text" required placeholder="${idea.title}"></label></li>
            <li><label for="description-txt">
                Description: <input id="description-txt" type="text" placeholder="${idea.description}"></label></li>
            <li><label for="status-select">
                Status: <select name ="status-options" id="status-select" class="form-field" required selected="${idea.status}"> 
                <option value="not-started">Not Started</option>
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
              </select> 
            </label></li>
            <li><label for="likability-radio">
                Likability:  <fieldset id="likability-radio" selected="${idea.likability}">
                <input type="radio" id="star3" name="rating" value="3" title="Love"> 
                <label for="star-3"></label>
                <input type="radio" id="star2" name="rating" value="2" title="Like">
                <label for="star-2"></label>
                <input type="radio" id="star1" name="rating" value="1" title="Eh">
                <label for="star-1"></label>
                </fieldset>
            </label></li>
            <li><button type="submit" class="primary-button" value="submit">Update</button><button type="cancel" class="primary-button" value="cancel">Cancel</button></li>
            </ul>
        </fieldset>
    </form>
    `
 }

 function generateNewIdeaForm(){
    return `
    <form id="form-new-idea" method="post">
        <fieldset>
            <legend>Update Idea Details</legend>
            <ul>   
           <li><label for="title-txt">
                First Name: <input id="title-txt" type="text" required></label></li>
            <li><label for="description-txt">
                Description: <input id="description-txt" type="text"></label></li>
            <li><label for="status-select">
                Status: <select name ="status-options" id="status-select" class="form-field" required> 
                <option value="not-started">Not Started</option>
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
              </select> 
            </label></li>
            <li><label for="likability-radio">
                Likability:  <fieldset id="likability-radio">
                <input type="radio" id="star3" name="rating" value="3" title="Love"> 
                <label for="star-3"></label>
                <input type="radio" id="star2" name="rating" value="2" title="Like">
                <label for="star-2"></label>
                <input type="radio" id="star1" name="rating" value="1" title="Eh">
                <label for="star-1"></label>
                </fieldset>
            </label></li>
            <li><button type="submit" class="primary-button" value="submit">Submit</button><button type="cancel" class="primary-button" value="cancel">Cancel</button></li>
            </ul>
        </fieldset>
    </form>
    `
 }

//what should this be placed into this be a do or generate function?
function generateLoggedInContent(contentData){
    //get all ideas by userID
    //how do I do validation that person is authenticated?
    displayNav(); 
    displayIdeaBoardTitle();
    //how do I do validation that person is authenticated?
    doUserIdeaListRetrival(jwtToken, displayUserIdeaBoard); //How would this work ..am I passing in user id? or is that already included?Do I need to pass anything?
}

//DISPLAY FUNCTIONS --------------------------------------------------------------------
function appendOrReplace(data, container, generator, append = true) {
    return append ? $(container).append(generator(data)) : $(container).html(generator(data));
}


function displayNav(state, container, append = false) {
   appendOrReplace(state, container, generateLoggedInNav, append);
}

function displayIdeaBoardTitle(state, container, append = false) {
    appendOrReplace(state, container, generateIdeaBoardTitleHTML, append);
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
    appendOrReplace(contentData, container, generateSignUpSuccessHTML, append);
};

function displayUserIdeaBoard(){
    const userIdeas = contentData.map((idea, index) => generateIdeaSummaryHTML(idea));
    $('.js-user-ideas').html(userIdeas);
}

function displayIdeaDetails (ideaDetails, container, append = false){
    appendOrReplace(ideaDetails, container, generateIdeaDetails, append);
};

function displayEditableIdeaForm (ideaDetails, container, append = false){
    appendOrReplace(ideaDetails, container, generateEditableIdeaForm, append);
};

function displayNewIdeaForm (container, append = false){
    appendOrReplace(container, generateNewIdeaForm, append);
};

//EVENT HANDLER FUNCTIONS -----------------------------------------------

//replace with just one event handler function for all events?
function handleShowSignUp (){
    $('body').on("click", "#js-show-sign-up-form-btn", (event) => {
        displaySignUpForm($('.js-content'));
    });
}

function handleShowLogIn (){
    $('body').on("click", ".js-show-log-in-form-btn", (event) => {
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
//should this be the generate logged in content ?
        doUserLogIn(credentials, displayLoggedInContent);
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

        doNewUserCreation(newUserData, displaySignUpSuccessHTML);
    });
   
}

function handleUpdateIdea (){
    $('body').on("submit", "#form-update-idea", (event) => {
        event.preventDefault();
        
        const updatedIdeaData = {
            title: $('#title-txt').val(),
            description: $('#description-txt').val(),
            status: $('#status-selector').val(),
            likability: $('#likability-radio').val(),
    
        }
//how to I pass updated idea and webtoken
        doIdeaUpdate(jwtToken, updatedIdeaData, displayLoggedInContent);
    });
}

function handleShowNewIdeaForm(){
    $('body').on("click", ".js-show-new-idea-form-btn", (event) => {
        displayNewIdeaForm($('.js-content'));
    });
}

function handleCreateNewIdea (){
    $('body').on("submit", "#form-new-idea", (event) => {
        event.preventDefault();
        
        const newIdeaData = {
            title: $('#title-txt').val(),
            description: $('#description-txt').val(),
            status: $('#status-selector').val(),
            likability: $('#likability-radio').val(),
        }
//how to I pass updated idea and webtoken
        doNewIdeaCreation(jwtToken, newIdeaData, displayLoggedInContent);
    });
}

function handleDeleteIdea(){
    $('body').on("click", "#js-delete-idea-btn", (event) => {
        //how to I pass updated idea and webtoken
        doIdeaDeletion(jwtToken, ideaID, displayLoggedInContent);
    });
}


function handleShowIdeaDetails(){
    $('body').on("click", ".js-show-idea-details-btn", (event) => {
        //how to I pass updated idea and webtoken
        doSpecificIdeaRetrival(jwtToken, ideaID, displayIdeaDetails);
    });
}


function handleShowEditableIdeaForm(){
    $('body').on("click", ".js-show-edit-idea-form-btn", (event) => {
        ////how to I pass updated idea and webtoken
        doSpecificIdeaRetrival(jwtToken, ideaID, displayEditableIdeaForm); 
    });
}

function handleLogOut (){
    $('#logout-btn').click(event => {
        // Delete Authenticated User Function- how?
});
}

//combine into one event handler function?
function setUpEventHandlers(){
    handleShowSignUp();
    handleSignUpSubmit();
    handleShowLogIn();
    handleLogInSubmit();
    handleLogOut();
}

function initializeUI(){
    displayWelcomeHTML();
    setUpEventHandlers();
}

//when page loads call initializeUI
$(initializeUI);