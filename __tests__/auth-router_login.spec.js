const jwt = require('jsonwebtoken');

const {createUser, resetTable, request} = require('./utils/');
const db = require('../data/dbConfig');
const {jwtSecret} = require('../config/secret.js');

const user = createUser();

const url = '/api/auth/login';
const method = 'post';

describe('Routers Auth', () => {
  beforeAll(async () => {
    await resetTable('users');
    await db('users').insert(user);
  });

  describe('POST /api/auth/login', () => {
    it('Returns correct body', async () => {
      const {
        body: {token},
        status,
        type,
      } = await request(url, {method, body: {...user, password: 'password'}});

      expect(status).toEqual(200);
      expect(type).toEqual('application/json');

      jwt.verify(token, jwtSecret, err => {
        expect(err).toBeNull();
      });
    });

    it('Return 400 if wrong credentials', async () => {
      const {status, type} = await request(url, {
        method,
        body: {email: 'Wrong Email', password: 'Wrong Password'},
      });
      expect(status).toEqual(401);
      expect(type).toEqual('application/json');
    });
  });
});
