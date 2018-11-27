const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const jsonwebtoken = require("jsonwebtoken");
const faker = require("faker");
const { app, startServer, stopServer } = require("../app/server");
const { User } = require("../app/user/user.model");
const { TEST_DATABASE_URL , JWT_SECRET, JWT_EXPIRY } = require("../app/config");
const expect = chai.expect;
chai.use(chaiHttp);

describe('tests for /api/auth', function() {
  let testUser, authToken;

  before(function () {
    return startServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    testUser = generateUserData();

    return User.hashPassword(testUser.password).then(hashedPassword => {
      return User.create({
        firstname: testUser.firstname,
        lastname: testUser.lastname,
        email: testUser.email,
        username: testUser.username,
        password: hashedPassword
      })
        .then(createdUser => {
          testUser.id = createdUser.id;

          authToken = jsonwebtoken.sign( 
            {
              user: 
              {
                id: testUser.id,
                firstname: testUser.firstname,
                lastname: testUser.lastname,
                email: testUser.email,
                username: testUser.username
              }
            },
            JWT_SECRET, {
              algorithm: "HS256",
              expiresIn: JWT_EXPIRY,
              subject: testUser.username
            });
        })
        .catch(err => {
          console.error(err);
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
  });

  it('Should login correctly and return a valid JSON Web Token', function () {
    return chai.request(app)
        .post('/api/auth/login')
        .send({
            username: testUser.username,
            password: testUser.password
        })
        .then(res => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.body).to.include.keys('authToken');

            const jwtPayload = jsonwebtoken.verify(res.body.authToken, JWT_SECRET, {
                algorithm: ['HS256']
            });
            expect(jwtPayload.user).to.be.a('object');
            expect(jwtPayload.user).to.deep.include({
                username: testUser.username,
                email: testUser.email,
                firstname: testUser.firstname,
                lastname: testUser.lastname,
            });
        });
});

  it('should return a valid auth token with a newer expiry date', function () {
    const firstJwtPayload = jsonwebtoken.verify(authToken, JWT_SECRET, {
      algorithm: ['HS256']
    });
    return chai.request(app)
      .post('/api/auth/refresh')
      .set('Authorization', `Bearer ${authToken}`)
      .then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('authToken');

        const newJwtPayload = jsonwebtoken.verify(res.body.authToken, JWT_SECRET, {
            algorithm: ['HS256']
        });
        expect(newJwtPayload.user).to.be.a('object');
        expect(newJwtPayload.exp).to.be.at.least(firstJwtPayload.exp);
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
});
