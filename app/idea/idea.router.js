'use strict'

const express = require("express");
const Joi = require('joi');
const ideaRouter = express.Router();

const { Idea , ideaJoiSchema } = require('./idea.model.js');
const { jwtPassportMiddleware } = require('../auth/strategy');

// Retrieve a specific user's idea
ideaRouter.get('/', jwtPassportMiddleware, (req, res) => {
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
ideaRouter.post('/', jwtPassportMiddleware, (req, res) => {
  const newIdea = {
    user: req.user.id,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    likability: req.body.likeability,
    notes: req.body.notes,
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
ideaRouter.put('/:ideaid', jwtPassportMiddleware, (req, res) => {
  const ideaUpdate = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    likability: req.body.likeability,
    notes: req.body.notes
  };

  // Checks that all provided data passes all schema requirements
  const validation = Joi.validate(ideaUpdate, ideaJoiSchema);
  if (validation.error) {
    return res.status(400).json({ error: validation.error });
  }

  // Looks for idea by id, if found, updates info
  Idea.findByIdAndUpdate(req.params.ideaid, ideaUpdate)
    .then(() => {
      return res.status(204).end();
    })
    .catch(err => {
      return res.status(500).json(err)
    });
});

// Retrieve user ideas
ideaRouter.get('/board', jwtPassportMiddleware, (req, res) => {
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
ideaRouter.get('/:ideaid', (req, res) => {
  Idea.findById(req.params.ideaid)
    .populate('user')
    .then(owner => {
      return res.status(200).json(idea.serialize());
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

  // Remove idea by id
ideaRouter.delete('/:ideaid', jwtPassportMiddleware, (req, res) => {
  Idea.findByIdAndDelete(req.params.ideaid)
    .then(() => {
      return res.status(204).end();
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

module.exports = { ideaRouter };