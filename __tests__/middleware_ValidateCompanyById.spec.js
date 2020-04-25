const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');
const jwt = require('jsonwebtoken');
const {COMPANY_NOT_FOUND_ERROR} = require('../config/errors.js');

describe('server.js', () => {
  beforeEach(async () => {
    await db.raw('truncate table reviews restart identity cascade');
    await db.raw('truncate table companies restart identity cascade');
    await db.raw('truncate table users restart identity cascade');
  });

  /*************************** VALIDATE COMPANY BY ID *******************************/

  describe('ValidateCompanyById Middleware', () => {
    it('should 404 error if the company id does not exist', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'mario',
          password: 'superstar',
          email: 'mario@gmail.com',
          track_id: 1
        });
      //open the database and see that the new user is there
      const newUsers = await db('users');
      expect(newUsers).toHaveLength(1);
      expect(res.status).toEqual(201);
      // check token exists
      const token = res.body.token;
      expect(token.length).toBeGreaterThan(20);
      // find a company by id
      res = await request(server)
        .get('/api/companies/1')
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.status).toEqual(404);
      expect(res.body).toMatchObject({message: COMPANY_NOT_FOUND_ERROR});
    });
  });
});
