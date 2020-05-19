const {createUser, request, resetTable} = require('./utils/');
const db = require('../data/dbConfig');
const signToken = require('../config/token');
const User = require('../helpers/users-model');

const user = createUser();

const token = signToken(user);

describe('Routers Users', () => {
  beforeAll(async () => {
    await resetTable('users');
    await db('users').insert(user);
  });

  describe('GET /api/users/:userId', () => {
    it('Should return proper body', async () => {
      const {body, status, type} = await request(`/api/users/${user.id}`, {
        token,
      });

      expect(status).toBe(200);
      expect(type).toBe('application/json');

      const userInfo = await User.findUserById(user.id);

      expect(body).toEqual(userInfo);
    });
  });
});
