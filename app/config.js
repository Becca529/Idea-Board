"use strict";

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost/idea-board',
  TEST_DATABASE_URL : process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-idea-board',
  PORT: process.env.PORT || 8080,
  JWT_SECRET: process.env.JWT_SECRET || "default",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "7d"
};
