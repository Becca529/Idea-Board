const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, startServer, stopServer } = require('../app/server');
const { DATABASE_URL } = require('../app/config');
const expect = chai.expect;
chai.use(chaiHttp);

describe('tests for /', function () {
  before(function () {
    return startServer(true);
  });

  after(function () {
    return stopServer();
  });

  it('should run index.html', function () {
    chai.request(app)
      .get('/')
      .then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      })
  });
});