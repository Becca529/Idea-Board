'use strict'

const express = require("express");
const Joi = require('joi');
const ideaRouter = express.Router();

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const passport = require('passport');

const { Idea , ideaJoiSchema } = require('./idea.model.js');
const { jwtStrategy } = require('../auth/auth.strategy');

passport.use(jwtStrategy);
const jwtAuth = passport.authenticate('jwt', { session: false });


// Retrieve user ideas
ideaRouter.get('/', jsonParser, jwtAuth, (req, res) => {
  console.log(req.user);
  Idea.find({ user: req.user.id })
    .populate('user')
    .then(ideas => {
      return res.status(200).json(
        ideas.map(idea => idea.serialize())
      );
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});


//Create a new idea 
ideaRouter.post('/', jsonParser, jwtAuth, (req, res) => {
  console.log(req.user);
  const newIdea = {
    user: req.user.id,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    likability: req.body.likeability,
  };
  
   // Checks that all provided data passes all schema requirements
   const validation = Joi.validate(newIdea, ideaJoiSchema);
   if (validation.error) {
     return res.status(400).json({ error: validation.error });
   }

     // Creates a new instance of idea
  Idea.create(newIdea)
  .then(createdIdea => {
    return res.status(201).json(createdIdea.serialize());
  })
  .catch(err => {
    return res.status(500).json(err);
  });
});
    
// Update idea by id
ideaRouter.put('/:ideaid', jsonParser, jwtAuth, (req, res) => {
  console.log("made it to put router");
  const updatedIdea = {
    //id: req.body.ideaID,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    likability: req.body.likability,
    //notes: req.body.notes
  };
console.log(updatedIdea);
  // Checks that all provided data passes all schema requirements
  const validation = Joi.validate(updatedIdea, ideaJoiSchema);
  if (validation.error) {
    return res.status(400).json({ error: validation.error });
  }

  // Looks for idea by id, if found, updates info
  Idea.findByIdAndUpdate(req.para, updatedIdea)
    .then(() => {
      console.log(req.params.id, "found-id");
      return res.status(204).end();
    })
    .catch(err => {
      return res.status(500).json(err)
    });
});

// Retrieve user ideas
ideaRouter.get('/', jsonParser, (req, res) => {
  Idea.find({ user: req.user.id })
    .populate('user')
    .then(ideas => {
      return res.status(200).json(
        ideas.map(idea=> idea.serialize())
      );
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

// Retrieve all ideas
ideaRouter.get('/all', (req, res) => {
  Idea.find()
    .populate('user')
    .then(ideas => {
      return res.status(200).json(
        ideas.map(idea => idea.serialize())
      );
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

// Retrieve one idea by id
ideaRouter.get('/:ideaID', jsonParser, (req, res) => {
  Idea.findById(req.params.ideaID)
    .populate('user')
    .then(idea => {
      return res.status(200).json(idea.serialize());
    })
    .catch(err => {
      return res.status(500).json(err);
      
    });
});

  // Remove idea by id
ideaRouter.delete('/:ideaid', jsonParser, (req, res) => {
  Idea.findByIdAndDelete(req.params.ideaid)
    .then(() => {
      return res.status(204).end();
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

module.exports = { ideaRouter };