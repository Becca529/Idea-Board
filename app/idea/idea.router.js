'use strict'

const express = require("express");
const ideaRouter = express.Router();

const { Idea } = require('./idea.model.js');


//Idea Board route - list all ideas
ideaRouter.get('/board', )

//Find one idea

//Create a new idea 
ideaRouter.post('/idea', (req, res) => {
    const requiredFields = ['userName', 'title', 'status'];
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