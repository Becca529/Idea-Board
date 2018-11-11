'use strict'

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const {DATABASE_URL, PORT} = require('./config');
const { userRouter } = require('./user/user.router');
const { ideaRouter } = require("./idea/idea.router");
const { authRouter } = require('./auth/auth.router');
const { localStrategy, jwtStrategy } = require('./auth/auth.strategy');

const app = express();
let server;

//Configure passport to use local/jsonweb token strategies for authetentation 
passport.use(localStrategy);
passport.use(jwtStrategy); 

//Middleware
app.use(morgan("common"));
app.use(express.json()); 
app.use(express.static('./public')); 

//Routers
app.use('/user', userRouter); // Redirects all calls to /api/user to userRouter.
app.use('/idea', ideaRouter); // Redirects all calls to /board to ideaRouter.
app.use('/auth', authRouter); // Redirects all calls to /user to userRouter.


//For unhandled HTTP requests - return 404 not found error
app.use('*', function (req, res) {
  res.status(404).json({ error: 'Not Found.' });
});

//Connect to MongoDB database and start expressJS server
function startServer(dataBaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    //Connect to database
    mongoose.connect(dataBaseUrl, { useNewUrlParser: true }, err => {
          if (err) {
              //If error connecting to database - print out error to console and reject promise
              console.error(err);
              return reject(err);
          } else {
              //If database connect successful - Start Express server
              server = app.listen(port, () => {
                  //If expressJS server start successfull - print success msg to console and resolve promise
                  console.log(`Express server listening on http://localhost:${port}`);
                  resolve();
              }).on('error', err => {
                  ////If error with expressJS server start - disconnect from MongoDB database, print out error to console and reject promise
                  mongoose.disconnect();
                  console.error(err);
                  reject(err);
              });
          }
      });
  });
}

//Disconnect from MongoDB database and shuts down expressJS server
function stopServer() {
  //Disconnect from database
  return mongoose
      .disconnect()
      .then(() => new Promise((resolve, reject) => {
          //Shutdown ExpressJS server
          server.close(err => {
              if (err) {
                  //If error with server shutdown - print out error to console and resolve promise
                  console.error(err);
                  return reject(err);
              } else {
                  //If server shutdown successfull - print out success msg to console
                  console.log('Express server stopped.');
                  resolve();
              }
          });
      }));
    }


if (require.main === module) {
    startServer().catch(err => {
        console.error(err);
    });
}

module.exports = { app, startServer, stopServer };