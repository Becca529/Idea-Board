const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const { app, startServer, stopServer } = require('../app/server');
const { User } = require('../app/user/user.model');
const { DATABASE_URL } = require('../app/config');
const expect = chai.expect;
chai.use(chaiHttp);

describe('tests for /api/user', function() {
  let testUser;

  before(function() {
    return startServer(DATABASE_URL);
  });

  // Create a test user before each test
  beforeEach(function() {
    testUser = generateUserData();

    return User.create(testUser)
      .then(() => { })
      .catch(err => {
        console.error(err);
      });
  });

  afterEach(function() {
    return new Promise((resolve, reject) => {
      mongoose.connection.dropDatabase()
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  });

  after(function() {
    return stopServer();
  });

  describe('GET', function() {
    it('should return all users', function() {
      return chai.request(app)
        .get('/api/user')
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.lengthOf.at.least(1);
          expect(res.body[0]).to.include.keys('id', 'firstName', 'lastName', 'email', 'username', )
        });
    });

    it('should return a specific user', function() {
      let searchUser;
      return chai.request(app)
        .get('/api/user')
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.lengthOf.at.least(1);
          searchUser = res.body[0];
          return User.findById(searchUser.id);
        })
        .then(user => {
          expect(searchUser.id).to.equal(user.id);
          expect(searchUser.firstName).to.equal(user.firstName);
          expect(searchUser.lastName).to.equal(user.lastName);
          expect(searchUser.email).to.equal(user.email);
          expect(searchUser.username).to.equal(user.username);
        });
    });
  });

  describe('POST', function() {
    it('should create a new user', function() {
      let newUser = generateUserData();
      return chai.request(app)
        .post('/api/user')
        .send(newUser)
        .then(res => {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object')
          expect(res.body).to.include.keys('id', 'username', 'firstName', 'lastName', 'email');
          expect(res.body.firstName).to.equal(newUser.firstName);
          expect(res.body.lastName).to.equal(newUser.lastName);
          expect(res.body.email).to.equal(newUser.email);
          expect(res.body.username).to.equal(newUser.username);
        });
    });
  });

  // Generates a User object
  function generateUserData() {
    return {
      firstName: `${faker.name.firstName()}`,
      lastName: `${faker.name.lastName()}`,
      email: `${faker.internet.email()}`,
      username: `${faker.internet.userName()}`,
      password: `${faker.internet.password()}`
    };
  }
});