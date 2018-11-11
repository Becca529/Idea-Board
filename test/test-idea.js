const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const jsonwebtoken = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY, TEST_DATABASE_URL } = require('../app/config');
const { runServer, closeServer, app } = require('../app/server');
const { User } = require('../app/user/model');
const { Idea } = require('../app/idea/idea.model');
const expect = chai.expect;
chai.use(chaiHttp);

describe('tests for api/owner', function() {
  let testUser, jwtToken;

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    testUser = generateUserData();

    return User.hashPassword(testUser.password)
      .then(hashedPassword => {
        return User.create({
          firstName: testUser.firstName,
          lastName: testUser.lastName,
          username: testUser.username,
          password: hashedPassword
        })
        .catch(err => {
          console.error(err);
          throw new Error(err);
        });
      })
      .then(createdUser => {
        testUser.id = createdUser.id;

        jwtToken = jsonwebtoken.sign(
          {
            user: {
              id: testUser.id,
              firstName: testUser.firstName,
              lastName: testUser.lastName,
              username: testUser.username
            }
          },
          JWT_SECRET,
          {
            algorithm: 'HS256',
            expiresIn: JWT_EXPIRY,
            subject: testUser.username
          }
        );

        const seedData = [];
        for (let i = 1; i <= 10; i++) {
          const newIdea = generateIdeaData();
          newIdea.user = createdUser.id;
          seedData.push(newIdea);
        }
        return Idea.insertMany(seedData)
          .catch(err => {
            console.error(err);
            throw new Error(err);
          });
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
    return closeServer();
  })

  describe('POST', function() {
    it('should create a idea', function() {
      let newIdea = generateIdeaData();
      return chai.request(app)
        .post('/api/owner')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(newIdea)
        .then(res => {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('user', 'title', 'description', 'status', 'likability', 'notes');
        })
    });
  });

  describe('GET', function() {
    it('should return a users ideas', function() {
      return chai.request(app)
        .get('/api/owner')
        .set('Authorization', `Bearer ${jwtToken}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.lengthOf.at.least(1);
          const idea = res.body[0];
          expect(idea).to.include.keys('user', 'title', 'description', 'status', 'likeability', 'notes');
          expect(idea.user).to.be.a('object');
          expect(idea.user).to.include.keys('firstName', 'lastName', 'username');
        })
    });

    it('should return a specific idea', function() {
      let searchIdea;
      return Idea.find()
        .then(ideas => {
          expect(ideas).to.be.a('array');
          expect(ideas).to.have.lengthOf.at.least(1);
          searchIdeas = ideas[0];

          return chai.request(app)
            .get(`/api/owner/${searchIdea.id}`)
            .set('Authorization', `Bearer ${jwtToken}`);
        })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('user', 'title', 'description', 'status', 'likeability', 'notes');
        })
    });
  });

  describe('PUT', function() {
    it('should update an idea details', function() {
      let ideaToUpdate;
      const newIdeaData = generateIdeaData();
      return Idea.find()
        .then(ideas => {
          expect(ideas).to.be.a('array');
          expect(ideas).to.have.lengthOf.at.least(1);
          ideaToUpdate = ideas[0];

          return chai.request(app)
            .put(`/api/owner/${ideaToUpdate.id}`)
            .set('Authorization', `Bearer ${jwtToken}`)
            .send(newIdeaData)
        })
        .then(res => {
          expect(res).to.have.status(204);

          return Idea.findById(ideaToUpdate.id);
        })
        .then(idea => {
          expect(idea).to.be.a('object');
        });
    });
  });

  describe('DELETE', function() {
    it('should delete an user idea', function() {
      let ideaToDelete;
      return Idea.find()
        .then(ideas => {
          expect(ideas).to.be.a('array');
          expect(ideas).to.have.lengthOf.at.least(1);
          ideaToDelete = ideas[0];

          return chai.request(app)
            .delete(`/api/owner/${ideaToDelete.id}`)
            .set('Authorization', `Bearer ${jwtToken}`);
        })
        .then(res => {
          expect(res).to.have.status(204);

          return Idea.findById(ideaToDelete.id);
        })
        .then(idea => {
          expect(idea).to.not.exist;
        });
    });
  });

  // Generates a User object
  function generateUserData() {
    return {
      firstName: `${faker.name.firstName()}`,
      lastName: `${faker.name.lastName()}`,
      username: `${faker.internet.userName()}`,
      password: `${faker.internet.password()}`
    };
  }
///////////////Update faker Info
  // Generates a idea object
  function generateIdeaData() {
    return {
      title: `${faker.name.firstName()}`,
      description: `${faker.name.lastName()}`,
      status: `${faker.name.firstName()}`,
      likeability: `${faker.address.streetAddress()}`,
      notes: `${faker.lorem.paragraph()}`
    };
  }
});