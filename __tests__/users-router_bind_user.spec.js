const request = require('supertest');

const createUser = require('./utils/');
const db = require('../data/dbConfig.js');
const server = require('../api/server.js');
const signToken = require('../config/token');
const User = require('../helpers/users-model.js');


const admin = createUser({admin: true});
const user = createUser(({id: 2, email: 'other@user.com'}));

function put(token) {
  return request(server).put(`/api/users/${user.id}/bind`).set('Authorization', token);
}

describe('Routers Users', () => {
  describe('PUT /api/users/:userId/bind', () => {
    beforeEach(async () => {
      await db.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE;');
      await db('users').insert([admin, user]);
    });

    it('Should return 202 on success', async () => {
      const token = signToken(admin);

      const res = await put(token);

      expect(res.status).toEqual(202);
    });

    it('Should return proper body', async () => {
      const token = signToken(admin);

      const res = await put(token);

      const userInfo = await User.findUserById(user.id);

      expect(res.body).toEqual({updatedInfo: userInfo});
    });

    it('Should toggle block', async () => {
      const token = signToken(admin);

      let res = await put(token);

      expect(res.body.updatedInfo.blocked).not.toEqual(user.blocked);

      res = await put(token);

      expect(res.body.updatedInfo.blocked).toEqual(user.blocked);
    });
  });
});
