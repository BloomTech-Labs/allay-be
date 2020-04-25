const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');
const jwt = require('jsonwebtoken');
const {MISSING_TOKEN_ERROR} = require('../config/errors.js');

describe('server.js', () => {
  beforeEach(async () => {
    await db.raw('truncate table reviews restart identity cascade');
    await db.raw('truncate table companies restart identity cascade');
    await db.raw('truncate table users restart identity cascade');
  });

  /*************************** RESTRICTED *******************************/

  describe('Restriction Middleware', () => {
    it('should deny a user access to reviews dashboard with missing token', async () => {
      // get a list of reviews
      res = await request(server).get('/api/reviews');
      //should deny access without token/login
      expect(res.status).toEqual(401);
      expect(res.body).toMatchObject({message: MISSING_TOKEN_ERROR});
    });
    it('should deny a user access to companies dashboard with missing token', async () => {
      // get a list of companies
      res = await request(server).get('/api/companies');
      //should deny access without token/login
      expect(res.status).toEqual(401);
      expect(res.body).toMatchObject({message: MISSING_TOKEN_ERROR});
    });
    it('should deny a user access to users dashboard with missing token', async () => {
      // get a list of companies
      res = await request(server).get('/api/users');
      //should deny access without token/login
      expect(res.status).toEqual(401);
      expect(res.body).toMatchObject({message: MISSING_TOKEN_ERROR});
    });
  });
});
