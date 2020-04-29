const request = require('supertest');

const createUser = require('./utils/');
const db = require('../data/dbConfig.js');
const server = require('../api/server.js');
const signToken = require('../config/token');
const User = require('../helpers/users-model.js');


const admin = createUser({admin: true});
const user = createUser(({id: 2, email: 'other@user.com'}));

function get(token) {
  return request(server).get(`/api/users/all`).set('Authorization', token);
}

describe('Routers Users', () => {
  beforeAll(async () => {
    await db.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE;');
    await db('users').insert([admin, user]);
  });

  describe('GET /api/users/all', () => {
    it('Should return 200 on success', async () => {
      const token = signToken(admin);

      const res = await get(token);

      expect(res.status).toBe(200);
    });

    it('Should return proper body', async () => {
      const token = signToken(admin);

      const res = await get(token);

      const allUsers = await User.findUsers();

      expect(res.body).toEqual(allUsers);
    });
  });
});
