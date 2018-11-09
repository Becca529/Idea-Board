'use strict'

const express = require("express");
const morgan = require("morgan");
const mongoose = require('mongoose');
const passport = require('passport');
mongoose.Promise = global.Promise;

const {DATABASE_URL, PORT} = require('./config');
const { userRouter } = require('./user/user.router');
const { ideaRouter } = require("./idea/idea.router");
const { authRouter } = require('./auth/auth.router');
const { localStrategy, jwtStrategy } = require('./auth/auth.strategy');

const app = express();
let server;
passport.use(localStrategy); // Configure Passport to use our localStrategy when receiving Username + Password combinations
passport.use(jwtStrategy); // Configure Passport to use our jwtStrategy when receving JSON Web Tokens

//MIDDLEWARE
app.use(morgan("common"));
app.use(express.json()); // Required so AJAX request JSON data payload can be parsed and saved into request.body
app.use(express.static('./public')); // Intercepts all HTTP requests that match files inside /public

//ROUTER SETUP
app.use('/user', userRouter); // Redirects all calls to /api/user to userRouter.
app.use('/board', ideaRouter); // Redirects all calls to /board to ideaRouter.
app.use('/auth', authRouter); // Redirects all calls to /user to userRouter.


// Unhandled HTTP request - return 404 not found error
app.use('*', function (req, res) {
  res.status(404).json({ error: 'Not Found.' });
});


module.exports = { app, startServer, stopServer };

function startServer(testEnv) {
  return new Promise((resolve, reject) => {
      let mongoUrl;

      if (testEnv) {
          mongoUrl = TEST_MONGO_URL;
      } else {
          mongoUrl = MONGO_URL;
      }
      // Step 1: Attempt to connect to MongoDB with mongoose
      mongoose.connect(mongoUrl, { useNewUrlParser: true }, err => {
          if (err) {
              // Step 2A: If there is an error starting mongo, log error, reject promise and stop code execution.
              console.error(err);
              return reject(err);
          } else {
              // Step 2B: Start Express server
              server = app.listen(PORT, () => {
                  // Step 3A: Log success message to console and resolve promise.
                  console.log(`Express server listening on http://localhost:${PORT}`);
                  resolve();
              }).on('error', err => {
                  // Step 3B: If there was a problem starting the Express server, disconnect from MongoDB immediately, log error to console and reject promise.
                  mongoose.disconnect();
                  console.error(err);
                  reject(err);
              });
          }
      });
  });
}

function stopServer() {
  // Step 1: Disconnect from the MongoDB database using Mongoose
  return mongoose
      .disconnect()
      .then(() => new Promise((resolve, reject) => {
          // Step 2: Shut down the ExpressJS server
          server.close(err => {
              if (err) {
                  // Step 3A: If an error ocurred while shutting down, print out the error to the console and resolve promise;
                  console.error(err);
                  return reject(err);
              } else {
                  // Step 3B: If the server shutdown correctly, log a success message.
                  console.log('Express server stopped.');
                  resolve();
              }
          });
      }));
    }