var assert = require('assert');
var superagent = require('superagent');
// var server = require('../app');
var status = require('http-status');
// var testPort = 8000;
// var app;

// before(function() {
//   server(testPort);
// });

// after(function() {
//   app.close();
// });

describe('/login', function() {

  it('return status 200 if page is accessed', function(done) {
    superagent.get('http://localhost:8999/login').end(function(err, res) {
      assert.ifError(err);
      assert.equal(res.status, status.OK);
      done();
    });
  });

  it('returns 200 if user is logged in', function(done) {
    superagent.post('http://localhost:8999/login')
    .set('Content-Type', 'application/json')
    .send({username:"test",password:"test"})
    .end(function(err, res) {
      assert.ifError(err);
      assert.equal(res.status, status.OK);
      done();
    });
  });

  it('returns 401 if user is not a real user', function(done) {
    superagent.post('http://localhost:8999/login')
    .set('Content-Type', 'application/json')
    .send({username:"test",password:"test"})
    .end(function(err, res) {
      assert.ifError(err);
      assert.equal(res.status, status.UNAUTHORIZED);
      done();
    });
  });
});