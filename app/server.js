'use strict'

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const {DATABASE_URL, PORT} = require('./config');
const { userRouter } = require('./user/user.router');
const { ideaRouter } = require('./idea/idea.router');
const { authRouter } = require('./auth/auth.router');
const { localStrategy, jwtStrategy } = require('./auth/auth.strategy');

const app = express();
let server;

// CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    if (req.method === 'OPTIONS') {
      return res.send(204);
    }
    next();
  });

//Configure passport to use local/jsonweb token strategies for authetentation 
passport.use(localStrategy);
passport.use(jwtStrategy); 

//Middleware
app.use(morgan("common"));
app.use(express.json()); 
app.use(express.static('./public')); 

//Routers
app.use('/api/user', userRouter); // Redirects all calls to /api/user to userRouter.
app.use('/api/idea', ideaRouter); // Redirects all calls to /idea to ideaRouter.
app.use('/api/auth', authRouter); // Redirects all calls to /user to userRouter.

const jwtAuth = passport.authenticate('jwt', { session: false });


//For unhandled HTTP requests - return 404 not found error
app.use('*', function (req, res) {
  res.status(404).json({ error: 'Not Found.' });
});

app.get('/api/protected', jwtAuth, (req, res) => {
    return res.json({
      data: 'rosebud'
    });
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
              console.log("mongo connected")
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