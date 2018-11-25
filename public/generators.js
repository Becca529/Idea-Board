//GENERATOR FUNCTIONS-------------------------------------

function generateWelcomeHTML() {
    return `
       <div class= "js-welcome-content">
           <h1>Welcome to Idea Board</h1>
           <h2>A place to create and store your creative juices for ideas and projects.</h2>
           <button class="js-show-log-in-form-btn" type="button">Log In</button>
       </div>
       <p class="sign-up-text ">New user?<button id="js-show-sign-up-form-btn" type="button">Sign up</button></p>
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
           <div class="row">
               <div class="col-25">
                   <label for="username-txt">Username:</label>
               </div>
               <div class="col-75">
                   <input id="username-txt" type="text" required>
               </div>
           </div>
           <div class="row">
               <div class="col-25">
                   <label for="password-txt">Password:</label>
               </div>
               <div class="col-75">
                   <input id="password-txt" type="password" required>
               </div>
           </div>
           <div class="row">
               <button class="primary-button" type="submit" value="Sign In">Sign In</button><button class="primary-button cancel-btn"
                   value="cancel">Cancel</button>
           </div>
       </fieldset>
   </form>
       `
   }
   
   function generateSignUpForm(){
   return `
   <form id="form-sign-up" method="post">
       <fieldset>
           <legend>Create an Account</legend>
           <div class="row">
           <div class="col-25">
               <label for="first-name-txt">First Name:<span class="required">*</span></label>
           </div>
           <div class="col-75">
               <input id="first-name-txt" type="text" required>
           </div>
       </div>
       <div class="row">
           <div class="col-25">
               <label for="last-name-txt">Last Name:<span class="required">*</span></label>
           </div>
           <div class="col-75">
               <input id="last-name-txt" type="text" required>
           </div>
       </div>
       <div class="row">
           <div class="col-25">
               <label for="email-txt">Email:<span class="required">*</span></label>
           </div>
           <div class="col-75">
               <input id="email-txt" type="email" required>
           </div>
       </div>
       <div class="row">
           <div class="col-25">
               <label for="username-txt">Username:<span class="required">*</span></label>
           </div>
           <div class="col-75">
               <input id="username-txt" type="text" required>
           </div>
       </div>
       <div class="row">
           <div class="col-25">
               <label for="password-txt">Password:<span class="required">*</span></label>
           </div>
           <div class="col-75">
               <input id="password-txt" type="password" required>
           </div>
       </div>
       <div class="row">
           <button type="submit" class="primary-button form-sign-up-button" value="submit">Submit</button><button type="cancel"
               class="primary-button cancel-btn" value="cancel">Cancel</button>
       </div>
       <div class="row">
           <p class="form-messages">*Required Field</p>
       </div>
       </fieldset>
   </form>
   `
   }
   
   function generateIdeaBoardTitle(){
     return `
       <div class="js-idea-board">
            <div class="row">
                <button class="js-show-new-idea-form-btn">Add New Idea</button>
            </div>
            <div class="row">
                <h1 class="idea-board-title">My Idea Board</h1>
            </div>
            <ul class="js-user-ideas"></ul>
        </div>
     `
   }
   
   function generateIdeaSummaryHTML(idea) {
      return `
        <div class="col-25">
            <ul class="idea-summary-note">
                <li class="create-date-summary">${idea.createDate}</li>
                <li class="summary-idea-title">${idea.title}</li>
                <li class="summary-idea-status">Status: ${idea.status}</li>
                <div class="summary-idea-footer">
                    <li><button class="js-show-idea-details-btn edit-idea-note" data-id="${idea.id}">View Details/Edit</button></li>
                </div>
            </ul>
        </div>
      `
   }
   
  function generateNav(state){
    return ` 
    ${state ? `<ul class="logged-in-nav">
    <li class="nav-account home-btn">Welcome: <span class="acount-name">${state}</span></li>
    <li class="js-log-out-btn">Log Out</a></li>
    </ul>`: ""}
    `
   } 

   
   function generateIdeaDetails(idea) {
       return `
       <div class = "idea-detailed-box">
        <ul class = "idea-detailed">
            <li class="create-date">Create Date: ${idea.createDate}</li>     
            <li class="idea-title">Title: ${idea.title}</li>
            <li class="idea-status">Status: ${idea.status}</li>
            <li class="idea-likeability">Likability: ${idea.likability}</li>
            <li class="idea-description">Description: ${idea.description}</li>
        </ul>
        <button class="js-show-edit-idea-form-btn" data-id="${idea.id}">Edit</button>
        <button class="js-delete-idea-btn" data-id="${idea.id}">Delete</button>
        <button class="cancel-btn" value="cancel">Cancel</button>
        </div>
       `
    }
   //review how to review and display data in different type of inputs ie status button radio button, text (placeholder or value or selected)
    function generateEditableIdeaForm(idea){
       return `
       <form id="form-update-idea" method="put" data-id="${idea.id}">
       <fieldset>
        <legend>Update Idea Details</legend>
            <div class="row">
                <div class="create-date-summary">Created: ${idea.createDate}</div>
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="title-txt">Title: </label>
                </div>
                <div class="col-75">
                    <input id="title-txt" type="text" required value="${idea.title}">
                </div>
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="description-txt">Description:</label>
                </div>
                <div class="col-75">
                    <textarea id="description-txt" type="text" required>${idea.description}</textarea>
                </div>
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="status-selector">Status:</label>
                </div>
                <div class="col-75">
                    <select name="status-options" id="status-selector" class="form-field" required>
                        <option value="Not-Started">Not Started</option>
                        <option value="Planning">Planning</option>
                        <option value="In-Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="On-Hold">On Hold</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="likability-selector">Likability: </label>
                </div>
                <div class="col-75">
                    <select name="likability-options" id="likability-selector" class="form-field" required>
                        <option value="Eh">Eh</option>
                        <option value="Like It">Like It</option>
                        <option value="Love It">Love It</option>
                     </select>
                </div>
            </div>
            <div class="row">
                <button type="submit" class="primary-button" value="submit">Update</button>
                <button type="cancel" class="primary-button cancel-btn" value="cancel">Cancel</button>
            </div>
    </fieldset>
    </form>
    `
    }
   
    function generateNewIdeaForm(){
       return `
       <form id="form-new-idea" method="post">
           <fieldset>
               <legend>Add New Idea</legend>
               <div class="row">
               <div class="col-25">
                   <label for="title-txt">Title: </label>
               </div>
               <div class="col-75">
                   <input id="title-txt" type="text" required>
               </div>
           </div>
           <div class="row">
               <div class="col-25">
                   <label for="description-txt">Description:</label>
               </div>
               <div class="col-75">
                   <textarea id="description-txt" type="textarea" style="height:150px"></textarea>
               </div>
           </div>
           <div class="row">
               <div class="col-25">
                   <label for="status-select">Status: </label>
               </div>
               <div class="col-75">
                   <select name="status-options" id="status-selector" class="form-field" required>
                       <option value="Not-Started">Not Started</option>
                       <option value="Planning">Planning</option>
                       <option value="In-Progress">In Progress</option>
                       <option value="Completed">Completed</option>
                       <option value="On-Hold">On Hold</option>
                   </select>
               </div>
           </div>
           <div class="row">
               <div class="col-25">
                   <label for="likability-selector">Likability: </label>
               </div>
               <div class="col-75">
                   <select name="likability-options" id="likability-selector" class="form-field" required>
                       <option value="Eh">Eh</option>
                       <option value="Like It">Like It</option>
                       <option value="Love It">Love It</option>
                    </select>
               </div>
           </div>
           <div class="row">
            <button type="submit" class="primary-button" value="submit">Submit</button><button type="cancel" class="primary-button cancel-btn" value="cancel">Cancel</button>
           </div>
           </fieldset>
       </form>
       `
    }
   

   function generateLoggedInContent(contentData){   
       return contentData.map((idea) => generateIdeaSummaryHTML(idea));
   }
   
   