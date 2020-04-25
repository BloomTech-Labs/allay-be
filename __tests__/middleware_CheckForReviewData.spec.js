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

  /*************************** CHECK FOR REVIEW DATA *******************************/

  describe('CheckForReviewData Middleware', () => {
    it('should 400 error if job_title is missing from body', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'mario',
          password: 'superstar',
          email: 'mario@gmail.com',
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
          company_name: 'Super Mario Bros',
          state_id: 5,
          hq_city: 'fresno'
        })
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.status).toEqual(201);
      // create a review
      res = await request(server)
        .post('/api/users/1/add-review')
        .send({
          job_title: '',
          city: 'mushroom kingdom',
          state_id: 5,
          salary: 30000,
          company_name: 'Super Mario Bros'
        })
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({message: MISSING_REQUIRED_BODY_FIELD});
    });
    it('should 400 error if job_location is missing from body', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'mario',
          password: 'superstar',
          email: 'mario@gmail.com',
          track_id: 2
        });
      expect(res.status).toEqual(201);
      // check token exists
      const token = res.body.token;
      expect(token.length).toBeGreaterThan(20);
      // create a new company
      res = await request(server)
        .post('/api/companies')
        .send({
          company_name: 'Super Mario Bros',
          state_id: 5,
          hq_city: 'Los Angeles'
        })
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.status).toEqual(201);
      // create a review
      res = await request(server)
        .post('/api/users/1/add-review')
        .send({
          job_title: 'plumber',
          city: '',
          state_id: '',
          salary: 30000,
          company_name: 'Google'
        })
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({message: MISSING_REQUIRED_BODY_FIELD});
    });
    it('should 400 error if salary is missing from body', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'mario',
          password: 'superstar',
          email: 'mario@gmail.com',
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
          company_name: 'Super Mario Bros',
          state_id: 5,
          hq_city: 'Los Angeles'
        })
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.status).toEqual(201);
      // create a review
      res = await request(server)
        .post('/api/users/1/add-review')
        .send({
          job_title: 'plumber',
          city: 'SF',
          state_id: 5,
          salary: '',
          company_name: 'Google'
        })
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({message: MISSING_REQUIRED_BODY_FIELD});
    });
    it('should 400 error if company_name is missing from body', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'mario',
          password: 'superstar',
          email: 'mario@gmail.com',
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
          company_name: 'Super Mario Bros',
          state_id: 5,
          hq_city: 'Los Angeles'
        })
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.status).toEqual(201);
      // create a review
      res = await request(server)
        .post('/api/users/1/add-review')
        .send({
          job_title: 'plumber',
          city: 'SF',
          state_id: 5,
          salary: 30000,
          company_name: ''
        })
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({message: MISSING_REQUIRED_BODY_FIELD});
    });
    it('should 400 error if review body is empty', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'mario',
          password: 'superstar',
          email: 'mario@gmail.com',
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
          company_name: 'Super Mario Bros',
          state_id: 5,
          hq_city: 'Los Angeles'
        })
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.status).toEqual(201);
      // create a review
      res = await request(server)
        .post('/api/users/1/add-review')
        .send()
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({message: MISSING_BODY_INFO_ERROR});
    });
  });
});
