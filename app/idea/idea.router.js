'use strict'

const express = require("express");
const ideaRouter = express.Router();

const { Idea } = require('./idea.model.js');


//Idea Board route - list all ideas
ideaRouter.get('/board', (req, res) => {
  //find ideas by user id
  //Idea 
   //.find()
   //.then(ideas)
  //middleware?


});

//Find one idea

//Create a new idea 
ideaRouter.post('/', (req, res) => {
    const requiredFields = ['userName', 'title', 'status'];
    const miss
    requiredFields.forEach(field => {
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  });


})



//Delete an idea

//Update an idea