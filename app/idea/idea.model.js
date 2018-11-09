const mongoose = require('mongoose');

const noteScehma = mongoose.Schema ({
    content: { type: String, required: true },
    createDate: { type: Date, default: Date.now }
});

const ideaSchema = mongoose.Schema ({
    userName: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String},
    status: {type: String, required: true },
    likability: {type: Number} ,
    createDate: { type: Date, default: Date.now },
    notes: [noteScehma]
});



ideaSchema.methods.serialize = function() {
    return {
      id: this._id,
      userName: this.userName,
      title: this.title,
      description: this.description,
      status: this.status,
      likability: this.likability,
      notes: this.notes
    };
  };


const Idea = mongoose.model('idea', ideaSchema);

module.exports = { Idea };