const bcrypt = require('bcryptjs');
const request = require('supertest');

const createUser = require('./utils/');
const db = require('../data/dbConfig.js');
const server = require('../api/server.js');
const signToken = require('../config/token');
const User = require('../helpers/users-model.js');


const user = createUser();

function del(token) {
  return request(server).del(`/api/users/${user.id}`).set('Authorization', token);
}

describe('Routers Users', () => {
  beforeEach(async () => {
    await db.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE;');
    await db('users').insert(user);
  });

  describe('DELETE /api/users/:userId', () => {
    it('Return 200 on success', async () => {
      const token = signToken(user);

      const res = await del(token);

      expect(res.status).toBe(200);
    });

    it('Deletes user on success', async () => {
      const token = signToken(user);

      await del(token);

      const deletedUser = await User.findUserById(user.id);

      expect(deletedUser).toBeNull();
    });
  });
});
