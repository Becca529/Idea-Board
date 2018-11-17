//ACTION FUNCTIONS
//HTTP REQUESTS
//creates new user through POST /api/user endpoint
function doNewUserCreation (newUserData, onSuccess, onError) {
    const settings = { 
            type: 'POST',
            url: '/api/user',
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
            url: '/api/auth/login',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(credentials),
            success: response => {
                user = response.authToken;
                username = response.username;
                if (onSuccess){
                   onSuccess(response)
                }
            },
            error: err => {
                console.error(err);
                if (onError) {
                    onError(err);
                }
            }
        };
        $.ajax(settings);    
    }

//Retrieves logged in user's ideas using GET /api/idea/ endpoint    
function getIdeas (options){
    const { jwToken, onSuccess} = options;
    $.ajax({
        type: 'GET',
        url: '/api/idea',
        contentType: 'application/json',
        dataType: 'json',
        headers: {
            'Authorization': `Bearer ${jwToken}`
        },
        success: onSuccess,
        error: err => {
           console.error(err);
        }
    });
}

//Creates a new idea using POST /api/idea endpoint
function createNewIdea (options){
    const { jwToken, newIdea, onSuccess, onError } = options;
    $.ajax({
        type: 'POST',
        url: '/api/idea',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(newIdea),
        headers: {
            'Authorization': `Bearer ${jwToken}`
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
function getIdeaDetails (options){
    //const {jwToken, ideaID, onSuccess } = options;
    //$.getJSON(`/idea/${ideaID}`, onSuccess);
    const { jwToken, ideaID, onSuccess} = options;
    $.ajax({
        type: 'GET',
        url: `/api/idea/${ideaID}`,
        contentType: 'application/json',
        dataType: 'json',
        headers: {
            'Authorization': `Bearer ${jwToken}`
        },
        success: onSuccess,
        error: err => {
           console.error(err);
        }
    });
}

//Update specific user idea using PUT /api/idea/:ideaid endpoint
function updateIdea (options){
    const {jwToken, ideaID, updatedIdea, onSuccess, onError } = options;
    $.ajax({
        type: 'PUT',
        url: `/api/idea/${ideaID}`,
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(updatedIdea),
        headers: {
            'Authorization': `Bearer ${jwToken}`
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
function deleteIdea (options){
    const { jwToken, ideaID, onSuccess, onError } = options;
    $.ajax({
        type: 'DELETE',
        url: `/api/idea/${ideaID}`,
        contentType: 'application/json',
        dataType: 'json',
        data: undefined,
        headers: {
            'Authorization': `Bearer ${jwToken}`
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


function getAndDisplayIdeas(){
    const success = response => {
       displayLoggedInContent(response, ('.js-user-ideas'), false);
   }
    const options = {jwToken: user, onSuccess: success};
    getIdeas(options);
    displayIdeaBoardTitle(null, '.js-content');
    displayNav(username, ('nav'));
    
}



