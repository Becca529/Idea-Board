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
       <section class= "js-idea-board">
           <div class= "idea-board-header">
               <h1 class="idea-board-title">Idea Board</h1>
               <button class="js-show-new-idea-form-btn">Add New Idea</button>
           </div>
           <ul class="js-user-ideas">
           </ul>
     </section>
     `
   }
   
   function generateIdeaSummaryHTML(idea) {
      return `
      <li class = "idea-summary-box">
       <ul class = "idea-summary">
            <li class="idea-title">${idea.title}</li>
            <li class="idea-status">${idea.status}</li>
            <li class="idea-likeability">${idea.likability}</li>
       </ul>
       <button class="js-show-idea-details-btn" data-id="${idea.id}">View Details/Edit</button>
       </li>
      `
   }
   
  function generateNav(state){
   return `
   <div class = "home-link">
    <a href="index.html"><img src="" class="icon-img" alt="home-link"></a>
    </div> 
    <ul class="logged-in-nav-details">
    <li>Welcome: <span class="acount-name">${user.firstname}</span></li>
    <li><button id="js-log-out-btn" type="button">Log Out</button></li>
    </ul>
   
   `
    //add user name and log out button to nav bar

   //$( "logged-in-nav-details" ).toggle();
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
   

   function generateLoggedInContent(contentData){   
       return contentData.map((idea) => generateIdeaSummaryHTML(idea));
   }
   
   