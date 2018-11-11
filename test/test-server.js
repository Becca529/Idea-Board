const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, runServer, closeServer } = require('../app/server');
const{ TEST_DATABASE_URL } = require('../app/config');
const expect = chai.expect;
chai.use(chaiHttp);

describe('tests for /', function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  after(function() {
    return closeServer();
  });

  it('should run index.html', function() {
    return chai
      .request(app)
      .get('/')
      .then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      })
  });
});