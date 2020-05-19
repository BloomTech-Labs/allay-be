const {createUser, request, resetTable} = require('./utils/');
const db = require('../data/dbConfig');
const signToken = require('../config/token');
const User = require('../helpers/users-model');

const user = createUser();

const method = 'del';
const token = signToken(user);

describe('Routers Users', () => {
  beforeAll(async () => {
    await resetTable('users');
    await db('users').insert(user);
  });

  describe('DELETE /api/users/:userId', () => {
    it('Deletes user on success', async () => {
      const {status, type} = await request(`/api/users/${user.id}`, {
        method,
        token,
      });

      expect(status).toBe(200);
      expect(type).toBe('application/json');

      const deletedUser = await User.findUserById(user.id);

      expect(deletedUser).toBeNull();
    });
  });
});
