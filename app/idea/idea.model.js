const mongoose = require('mongoose');
const Joi = require('joi');

const noteScehma = mongoose.Schema ({
    content: { type: String, required: true },
    createDate: { type: Date, default: Date.now }
});

const ideaSchema = mongoose.Schema ({
    userName: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    //need to check out user versus username
   // userName: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String},
    status: {type: String, required: true },
    likability: {type: Number} ,
    createDate: { type: Date, default: Date.now },
    notes: [noteScehma]
});



ideaSchema.methods.serialize = function() {
    let userName;

    if (typeof userName === 'function') {
      userName = this.userName.serialize();
    } else {
      userName = this.userName;
    }
    return {
      id: this._id,
      userName: userName,
      title: this.title,
      description: this.description,
      status: this.status,
      likability: this.likability,
      notes: this.notes
    };
  };

// Validate provided data when creating a new idea
const ideaJoiSchema = Joi.object().keys({
    userName: Joi.string().optional(),
    title: Joi.string().min(1).trim().required(),
    description: Joi.string().min(1).max(100).trim().allow(''),
    status: Joi.string().min(1).trim().required(),
    likeability: Joi.string().trim(),
    //notes: Joi.string().trim().required(),
  });
  
const Idea = mongoose.model('idea', ideaSchema);

module.exports = { Idea, ideaJoiSchema };