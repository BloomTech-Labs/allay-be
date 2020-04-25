const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');
const jwt = require('jsonwebtoken');
const {MISSING_REQUIRED_BODY_FIELD, MISSING_BODY_INFO_ERROR} = require('../config/errors.js');

describe('server.js', () => {
  beforeEach(async () => {
    await db.raw('truncate table reviews restart identity cascade');
    await db.raw('truncate table companies restart identity cascade');
    await db.raw('truncate table users restart identity cascade');
  });

  /*************************** CHECK FOR REGISTER DATA *******************************/

  describe('CheckForRegisterData Middleware', () => {
    it('should 400 error if username is missing from body', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: '',
          password: 'ImTheBest',
          email: 'toad@gmail.com',
          track_id: 1
        });
      //deny user registration due to missing username
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({message: MISSING_REQUIRED_BODY_FIELD});
    });
    it('should 400 error if password is missing from body', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'toad',
          password: '',
          email: 'toad@gmail.com'
        });
      //deny user registration due to missing password
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({message: MISSING_REQUIRED_BODY_FIELD});
    });
    it('should 400 error if email is missing from body', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'toad',
          password: 'ImTheBest',
          email: '',
          track_id: 1
        });
      //deny user registration due to missing email
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({message: MISSING_REQUIRED_BODY_FIELD});
    });
    it('should 400 error if track id is missing from body', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'toad',
          password: 'ImTheBest',
          email: '',
          track_id: ''
        });
      //deny user registration due to missing track id
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({message: MISSING_REQUIRED_BODY_FIELD});
    });

    it('should 400 error if body is empty', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send();
      //deny user registration due to missing username
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({message: MISSING_BODY_INFO_ERROR});
    });
  });
});
