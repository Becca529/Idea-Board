let user = null;

function initializeUI(){
    displayWelcomeHTML('.js-content');
    setUpEventHandlers();
}

//when page loads call initializeUI
$(initializeUI);