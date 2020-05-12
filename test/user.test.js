import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../api/index';
import User from '../api/models/user';

const { assert, expect, use } = chai;

use(chaiHTTP);

const API_PREFIX = '/api/v1';

before(done => {
  done();
});

describe('User Auth Endpoints', () => {
  context('Signup', () => {
    it('POST /auth/signup - User SignUp Validation Test(Required)', done => {
      chai
        .request(app)
        .post(`${API_PREFIX}/auth/signup`)
        .send({
          name: 'Roger Test',
          email: 'reggie@test.com',
          phone: '08028372825',
          type: 'user'
        })
        .then(res => {
          expect(res).to.have.status(400);
          assert.equal(res.body.status, 'error');
          assert.equal(res.body.type, 'validation');
          done();
        })
        .catch(err => console.log('POST /auth/signup', err.message));
    });
    it('POST /auth/signup - User SignUp Validation Test(Email)', done => {
      chai
        .request(app)
        .post(`${API_PREFIX}/auth/signup`)
        .send({
          name: 'Roger Test',
          email: 'roger',
          phone: '08028372825',
          password: 'pass',
          type: 'user'
        })
        .then(res => {
          expect(res).to.have.status(400);
          assert.equal(res.body.status, 'error');
          assert.equal(res.body.type, 'validation');
          done();
        })
        .catch(err => console.log('POST /auth/signup', err.message));
    });
    it('POST /auth/signup - User Can Sign Up', done => {
      chai
        .request(app)
        .post(`${API_PREFIX}/auth/signup`)
        .send({
          name: 'Roger Test',
          email: 'reggie@test.com',
          phone: '08028372825',
          password: 'password',
          type: 'user'
        })
        .then(res => {
          expect(res).to.have.status(201);
          assert.equal(res.body.status, 'success');
          done();
        })
        .catch(err => console.log('POST /auth/signup', err.message));
    });
    it("POST /auth/signup - User Can't signup again with the same email", done => {
      chai
        .request(app)
        .post(`${API_PREFIX}/auth/signup`)
        .send({
          name: 'Roger Test',
          email: 'reggie@test.com',
          phone: '08028372825',
          password: 'password',
          type: 'user'
        })
        .then(res => {
          expect(res).to.have.status(500);
          assert.equal(res.body.status, 'error');
          done();
        })
        .catch(err => console.log('POST /auth/signup', err.message));
    });
  });

  context('Login', () => {
    it('POST /auth/login - User Login Validation Test(Required)', done => {
      chai
        .request(app)
        .post(`${API_PREFIX}/auth/login`)
        .send({
          email: 'reggie@test.com'
        })
        .then(res => {
          expect(res).to.have.status(400);
          assert.equal(res.body.status, 'error');
          assert.equal(res.body.type, 'validation');
          done();
        })
        .catch(err => console.log('POST /auth/login', err.message));
    });
    it('POST /auth/login - User Login Validation Test(Email)', done => {
      chai
        .request(app)
        .post(`${API_PREFIX}/auth/login`)
        .send({
          email: 'roger',
          password: 'password'
        })
        .then(res => {
          expect(res).to.have.status(400);
          assert.equal(res.body.status, 'error');
          assert.equal(res.body.type, 'validation');
          done();
        })
        .catch(err => console.log('POST /auth/login', err.message));
    });
    it('POST /auth/login - User Cannot Login without being registered', done => {
      chai
        .request(app)
        .post(`${API_PREFIX}/auth/login`)
        .send({
          email: 'thesis@science.com',
          password: 'password'
        })
        .then(res => {
          expect(res).to.have.status(500);
          assert.equal(res.body.status, 'error');
          done();
        })
        .catch(err => console.log('POST /auth/login', err.message));
    });
    it('POST /auth/login - User Can Login', done => {
      chai
        .request(app)
        .post(`${API_PREFIX}/auth/login`)
        .send({
          email: 'reggie@test.com',
          password: 'password'
        })
        .then(res => {
          expect(res).to.have.status(200);
          assert.equal(res.body.status, 'success');
          done();
        })
        .catch(err => console.log('POST /auth/login', err.message));
    });
    it("POST /auth/login - User Can't login with incorrect password", done => {
      chai
        .request(app)
        .post(`${API_PREFIX}/auth/login`)
        .send({
          email: 'reggie@test.com',
          password: 'password111'
        })
        .then(res => {
          expect(res).to.have.status(500);
          assert.equal(res.body.status, 'error');
          done();
        })
        .catch(err => console.log('POST /auth/login', err.message));
    });
  });
});

after(done => {
  User.destroy({ where: { email: 'reggie@test.com' } }).then(() => {
    done();
  });
});
