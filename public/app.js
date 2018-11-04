'use strict'

var MOCK_IDEAS= {
	"ideas": [
        {
            "id": "1111111",
            "title": "Home Automation",
            "description": "Use raspberry pi to create home automation hub to tie all current devices together using open source software.",
            "status": "Planning",
            "likability": 3,
            "userId": "123",
            "publishedAt": 1470012976609,
            "notes": {
                "noteid": "1",
                "details": "researching open source software",
                "createdDate": "10/30/18"
            }
        },
        {
            "id": "2222222",
            "title": "Idea Board",
            "description": "Create an app for tracking ideas and projects.",
            "status": "In-Progress",
            "likability": 3,
            "userId": "123",
            "publishedAt": 1470012976609,
            "notes": {
                "noteid": "1",
                "details": "working on front end and mock data",
                "createdDate": "10/30/18"
            }
        },
        {
            "id": "333333",
            "title": "Create new Alexa skill for Idea Board",
            "description": "Create a new alexa skill to post a new idea to Idea Board app.",
            "status": "Not Started",
            "likability": 3,
            "userId": "123",
            "publishedAt": 1470012976609,
            "notes": {
                "noteid": "1",
                "details": "researching alexa skill approval process",
                "createdDate": "10/30/18"
            }
        },
        {
            "id": "4444444",
            "title": "Re-vamp Brookerage TMS",
            "description": "Re-create my older brokerage Transaction Management System from grad school.",
            "status": "Not Started",
            "likability": 2,
            "userId": "123",
            "publishedAt": 1470012976609,
            "notes": {
                "noteid": "1",
                "details": "focus currently moved to idea-board",
                "createdDate": "10/30/18"
            }
        }
    ]
};


// this function can stay the same even when we
// are connecting to real API
function getAndDisplayIdeaBoard() {
    getIdeaBoard(displayIdeaBoard);
    console.log(displayIdeaBoard);
};
// this function's name and argument can stay the
// same after we have a live API, but its internal
// implementation will change. Instead of using a
// timeout function that returns mock data, it will
// use jQuery's AJAX functionality to make a call
// to the server and then run the callbackFn

function getIdeaBoard(callbackFn) {
    // we use a `setTimeout` to make this asynchronous
    // as it would be with a real AJAX call.
	setTimeout(function(){ callbackFn(MOCK_IDEAS)}, 1);
}

// this function stays the same when we connect
// to real API later
function displayIdeaBoard(data) {
    const ideas = data.ideas.map((item, index) => renderIdeas(item));
    $('.js-idea-list').html(ideas);

}

function renderIdeas(idea) {
    return `
    <div class = "idea">
        <h2 class = "idea-title">${idea.title}</h2>
          <ul class = "idea-details">
            <li class="idea-status">Status: ${idea.status}</li>
            <li class="idea-likability">Likability: ${idea.likability}</li>
            <li class="idea-description">Description: ${idea.description}</li>
          </ul>
    </div>
  `
};
    

//  on page load do this
$(function() {
	getAndDisplayIdeaBoard();
});