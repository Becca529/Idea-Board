let user = null;
let username = null;

function initializeUI(){
    displayWelcomeHTML('.js-content');
    setUpEventHandlers();
}

//when page loads call initializeUI
$(initializeUI);