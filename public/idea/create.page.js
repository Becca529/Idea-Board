function onCreateSubmitNewIdeaBtn() {
    $('.js-new-idea-form').submit(event => {
        event.preventDefault();
        const newIdea = {
            title: $('#title-txt').val(),
            description: $('#description-txt').val(),
            status: $('#status-options').val(),
            likability: $('#likability-radio').val()
        };
        createNewIdea(newIdea, loadIdeaBoard);
    }
)};

function createNewIdea(idea, callback){
  
};


        
