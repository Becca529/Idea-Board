const mongoose = require('mongoose');
const Joi = require('joi');

const noteScehma = mongoose.Schema ({
    content: { type: String, required: true },
    createDate: { type: Date, default: Date.now }
});

const ideaSchema = mongoose.Schema ({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    title: { type: String, required: true },
    description: { type: String },
    status: {type: String, required: true },
    likability: {type: String, required: true } ,
    createDate: { type: Date, default: Date.now },
    //notes: [noteScehma]
});


ideaSchema.methods.serialize = function() {
    let user;

    if (typeof user === 'function') {
      user = this.user.serialize();
    } else {
      user = this.user;
    }
    return {
      id: this._id,
      user: user,
      title: this.title,
      description: this.description,
      status: this.status,
      likability: this.likability,
      createDate: this.createDate.toLocaleDateString()
      //notes: this.notes
    };
  };

// Validate provided data when creating a new idea
const ideaJoiSchema = Joi.object().keys({
    user: Joi.string().optional(),
    title: Joi.string().min(1).trim().required(),
    description: Joi.string().min(1).max(100).trim().allow(''),
    status: Joi.string().min(1).trim().required(),
    likability: Joi.string().trim(),
    createDate: Joi.date().optional()
    //notes: Joi.string().trim().required(),
  });
  
const Idea = mongoose.model('idea', ideaSchema);
module.exports = { Idea, ideaJoiSchema };