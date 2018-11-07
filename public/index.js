let user = null;

//ACTION FUNCTIONS
function doLogIn(credentials, success, failure){
//make function that call sucess or fail - success set user to something
}

function doSignUp(newUser, success, failure){
    
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


function generateLogInForm(){
    return `
    <form id="log-in-form">
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
<form id="sign-up-form">
    <fieldset>
        <legend>Sign Up</legend>
        <ul>   
       <li><label for="first-name-txt">
            Name: <input id="first-name-txt" type="text" required></label></li>
        <li><label for="last-name-txt">
            Name: <input id="last-name-txt" type="text" required></label></li>
        <li><label for="email-txt">
            Email: <input id="email-txt" type="email" required>
        </label></li>
        <li><label for="username-txt">
            Username: <input id="username-txt" type="text" required>
        </label></li>
        <li><label for="password-txt">
            Password: <input id="password-txt" type="password" required>
        </label></li>
        <li><input type="submit" value="Create Account"></li>
        </ul>
    </fieldset>
</form>
`
}

function generateLoggedInContent(contentData){

}

function generateNav(state){

}

//DISPLAY FUNCTIONS
function appendOrReplace(data, container, generator, append = true) {
    return append ? $(container).append(generator(data)) : $(container).html(generator(data));
}


function displayNav(state, container, append = false) {
   appendOrReplace(state, container, generateNav, append);
}

function displayLogInForm(container, append = false){
    appendOrReplace(null, container, generateSignInForm, append);
}

function displaySignUpForm(container, append = false){
    appendOrReplace(null, container, generateSignUpForm, append);
}

function displayLoggedInContent(contentData, container, append = false){
    appendOrReplace(contentData, container, generateLoggedInContent, append);
};

//EVENT HANDLER FUNCTIONS
function handleShowSignUp (){
    $('body').on("click", ".js-show-sign-up-btn", (event) => {
        displaySignUpForm($('js-content'));
    });
}

function handleShowLogIn (){
    $('body').on("click", ".js-show-log-in-btn", (event) => {
        displayLogInForm($('js-content'));
    });
}

function handleLogInSubmit (){
    $('body').on("submit", "#log-in-form", (event) => {
        event.preventDefault();
        const credentials = {
            username: $('#username-txt').val(),
            password: $('#password-txt').val()
        }
    });
}

function handleSignUpSubmit (){
    $('body').on("submit", "#sign-up-form", (event) => {
        event.preventDefault();
        const newUser = {
            username: $('#username-txt').val(),
            password: $('#password-txt').val(),
            firstName: $('#first-name-txt').val(),
            lastName: $('#last-name-txt').val(),
            email: $('#email-txt').val(),
            password: $('#password-txt').val()
        }
    });
}

function handleLogOut (){
  //
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