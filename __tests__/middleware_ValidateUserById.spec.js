const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');
const jwt = require('jsonwebtoken');
const {USER_NOT_FOUND_ERROR} = require('../config/errors.js');

describe('server.js', () => {
  beforeEach(async () => {
    await db.raw('truncate table reviews restart identity cascade');
    await db.raw('truncate table companies restart identity cascade');
    await db.raw('truncate table users restart identity cascade');
  });

  /*************************** VALIDATE USER BY ID *******************************/

  describe('ValidateUserById Middleware', () => {
    it('should 404 error if the user id does not exist', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'mario',
          password: 'superstar',
          email: 'mario@gmail.com',
          track_id: 3
        });
      //open the database and see that the new user is there
      const newUsers = await db('users');
      expect(newUsers).toHaveLength(1);
      expect(res.status).toEqual(201);
      // check token exists
      const token = res.body.token;
      expect(token.length).toBeGreaterThan(20);
      // find a user by id
      res = await request(server)
        .get('/api/users/2')
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.status).toEqual(404);
      expect(res.body).toMatchObject({message: USER_NOT_FOUND_ERROR});
    });
  });
});
