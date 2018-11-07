'use strict'

const express = require("express");
const morgan = require("morgan");
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {DATABASE_URL, PORT} = require('./config');
const ideaRouter = require("./idea/idea.router");

const app = express();

app.use(morgan("common"));
app.use(express.json());

app.use("/", ideaRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});