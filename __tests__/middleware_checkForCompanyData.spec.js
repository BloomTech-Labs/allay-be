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

  /*************************** CHECK FOR COMPANY DATA *******************************/

  describe('CheckForCompanyData Middleware', () => {
    it('should 400 error if company name is missing from body', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'toad',
          password: 'toadette',
          email: 'toad@gmail.com',
          track_id: 1
        });
      expect(res.status).toEqual(201);
      // check token exists
      const token = res.body.token;
      expect(token.length).toBeGreaterThan(20);
      // create a new company
      res = await request(server)
        .post('/api/companies')
        .send({
          company_name: '',
          state_id: ''
        })
        .set({ authorization: token, Accept: 'application/json' });
      // deny company registration due to missing company name
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({message: MISSING_REQUIRED_BODY_FIELD});
    });
    it('should 400 error if company body is empty', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'toad',
          password: 'toadette',
          email: 'toad@gmail.com',
          track_id: 1
        });
      expect(res.status).toEqual(201);
      // check token exists
      const token = res.body.token;
      expect(token.length).toBeGreaterThan(20);
      // create a new company
      res = await request(server)
        .post('/api/companies')
        .send()
        .set({ authorization: token, Accept: 'application/json' });
      // deny company registration due to empty body
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({message: MISSING_BODY_INFO_ERROR});
    });
  });
});
