const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const jsonwebtoken = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY, TEST_DATABASE_URL } = require('../app/config');
const { startServer, stopServer, app } = require('../app/server');
const { User } = require('../app/user/user.model');
const { Idea } = require('../app/idea/idea.model');

const expect = chai.expect;
chai.use(chaiHttp);

describe('tests for api/idea', function () {
  let testUser, jwToken;

  before(function () {
    return startServer(TEST_DATABASE_URL);
  });

  beforeEach(function () {
    testUser = generateUserData();

    return User.hashPassword(testUser.password)
      .then(hashedPassword => {
        return User.create({
          firstname: testUser.firstname,
          lastname: testUser.lastname,
          username: testUser.username,
          email: testUser.email,
          password: hashedPassword
        })
          .catch(err => {
            console.error(err);
            throw new Error(err);
          });
      })
      .then(createdUser => {
        testUser.id = createdUser.id;

        jwToken = jsonwebtoken.sign(
          {
            user: {
              id: testUser.id,
              firstname: testUser.firstname,
              lastname: testUser.lastname,
              email: testUser.email,
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

  afterEach(function () {
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

  after(function () {
    return stopServer();
  })

  //   it('should create an idea', function() {
  //     let newIdea = generateIdeaData();
  //     return chai.request(app)
  //       .post('/api/idea')
  //       .set('Authorization', `Bearer ${jwToken}`)
  //       .send(newIdea)
  //       .then(res => {
  //         expect(res).to.have.status(201);
  //         expect(res).to.be.json;
  //         expect(res.body).to.be.a('object');
  //         expect(res.body).to.include.keys('title', 'description', 'status', 'likability');
  //       })
  //   });
  // });

  it('should return user ideas', function () {
    return chai.request(app)
      .get('/api/idea')
      .set('Authorization', `Bearer ${jwToken}`)
      .then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.lengthOf.at.least(1);
        const idea = res.body[0];
        expect(idea).to.include.keys('title', 'description', 'status', 'likability');
        expect(idea.user).to.be.a('object');
        expect(idea.user).to.include.keys('firstname', 'lastname', 'username');
      })
  });

  it('should return a specific idea', function () {
    let searchIdea;
    return Idea.find()
      .then(ideas => {
        expect(ideas).to.be.a('array');
        expect(ideas).to.have.lengthOf.at.least(1);
        searchIdeas = ideas[0];

        return chai.request(app)
          .get(`/api/idea/${searchIdea.id}`)
          .set('Authorization', `Bearer ${jwToken}`);
      })
      .then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('title', 'description', 'status', 'likability');
      })
  });

  it('should update an idea details', function () {
    let ideaToUpdate;
    const newIdeaData = generateIdeaData();
    return Idea.find()
      .then(ideas => {
        expect(ideas).to.be.a('array');
        expect(ideas).to.have.lengthOf.at.least(1);
        ideaToUpdate = ideas[0];

        return chai.request(app)
          .put(`/api/idea/${ideaToUpdate.id}`)
          .set('Authorization', `Bearer ${jwToken}`)
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

  it('should delete an user idea', function () {
    let ideaToDelete;
    return Idea.find()
      .then(ideas => {
        expect(ideas).to.be.a('array');
        expect(ideas).to.have.lengthOf.at.least(1);
        ideaToDelete = ideas[0];

        return chai.request(app)
          .delete(`/api/idea/${ideaToDelete.id}`)
          .set('Authorization', `Bearer ${jwToken}`);
      })
      .then(res => {
        expect(res).to.have.status(204);

        return Idea.findById(ideaToDelete.id);
      })
      .then(idea => {
        expect(idea).to.not.exist;
      });
  });

  // Generates a User object
  function generateUserData() {
    return {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      username: `${faker.lorem.word()}${faker.random.number(100)}`,
      email: faker.internet.email(),
      password: faker.internet.password()
    };
  }
  ///////////////Update faker Info
  // Generates a idea object
  function generateIdeaData() {
    return {
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
      status: 'Not Started',
      likeability: 'Love It',
    };
  }
});