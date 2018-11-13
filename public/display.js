//DISPLAY FUNCTIONS --------------------------------------------------------------------
function appendOrReplace(data, container, generator, append = true) {
    return append ? $(container).append(generator(data)) : $(container).html(generator(data));
}

function displayNav(state, container, append = false) {
   appendOrReplace(state, container, generateNav, append);
}

function displayIdeaBoardTitle(state, container, append = false) {
    appendOrReplace(state, container, generateIdeaBoardTitleHTML, append);
 }

 function displayWelcomeHTML(container, append = false) {
    appendOrReplace(null, container, generateWelcomeHTML, append);
 }
 
function displayLogInForm(container, append = false){
    appendOrReplace(null, container, generateLogInForm, append);
}

function displaySignUpForm(container, append = false){
    appendOrReplace(null, container, generateSignUpForm, append);
}

function displayLoggedInContent(contentData, container, append = false){
    //displayNav();
    appendOrReplace(contentData, container, generateLoggedInContent, append);
};

function displaySignUpSuccessHTML(contentData, container, append = false){
    appendOrReplace(contentData, container, generateSignUpSuccessHTML, append);
};

function displayIdeaDetails (ideaDetails, container, append = false){
    appendOrReplace(ideaDetails, container, generateIdeaDetails, append);
};

function displayEditableIdeaForm (ideaDetails, container, append = false){
    appendOrReplace(ideaDetails, container, generateEditableIdeaForm, append);
};

function displayNewIdeaForm (container, append = false){
    appendOrReplace(container, generateNewIdeaForm, append);
};