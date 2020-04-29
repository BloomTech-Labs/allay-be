const request = require('supertest');

const createUser = require('./utils/');
const db = require('../data/dbConfig.js');
const server = require('../api/server.js');
const signToken = require('../config/token');
const User = require('../helpers/users-model.js');


const user = createUser();

function get(token) {
  return request(server).get(`/api/users/${user.id}`).set('Authorization', token);
}

describe('Routers Users', () => {
  beforeAll(async () => {
    await db.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE;');
    await db('users').insert(user);
  });

  describe('GET /api/users/:userId', () => {
    it('Should return 200 on success', async () => {
      const token = signToken(user);

      const res = await get(token);

      expect(res.status).toBe(200);
    });

    it('Should return proper body', async () => {
      const token = signToken(user);

      const res = await get(token);

      const userInfo = await User.findUserById(user.id);

      expect(res.body).toEqual(userInfo);
    });
  });
});
