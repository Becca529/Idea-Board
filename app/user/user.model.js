const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
mongoose.Promise = global.Promise;


const userSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//Defines an instance of a user
userSchema.methods.serialize = function () {
    return {
        id: this._id,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        username: this.username,
    };
};

//Hash provided password
userSchema.statics.hashPassword = function (password) {
    return bcrypt.hash(password, 10);
};

//Password match check looking at stored password and entered password
userSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

//Validates new user data against joi schema
const UserJoiSchema = Joi.object().keys({
    firstname: Joi.string().min(1).trim().required(),
    lastname: Joi.string().min(1).trim().required(),
    username: Joi.string().alphanum().min(4).max(30).trim().required(),
    password: Joi.string().min(8).max(30).trim().required(),
    email: Joi.string().email().trim().required()
});


const User = mongoose.model('user', userSchema);

module.exports = { User, UserJoiSchema };