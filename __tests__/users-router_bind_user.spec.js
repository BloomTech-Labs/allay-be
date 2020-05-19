const {createUser, resetTable, request} = require('./utils/');
const db = require('../data/dbConfig');
const signToken = require('../config/token');
const User = require('../helpers/users-model');

const admin = createUser({admin: true});
const user = createUser({id: 2, email: 'other@user.com'});

const method = 'put';
const token = signToken(admin);

describe('Routers Users', () => {
  beforeEach(async () => {
    await resetTable('users');
    await db('users').insert([admin, user]);
  });

  describe('PUT /api/users/:userId/bind', () => {
    it('Should return proper body', async () => {
      const oldUser = await User.findUserById(user.id);

      const {body, status, type} = await request(`/api/users/${user.id}/bind`, {
        method,
        token,
      });

      expect(status).toEqual(202);
      expect(type).toBe('application/json');

      const updatedUser = await User.findUserById(user.id);

      expect(body).toEqual({updatedInfo: updatedUser});
      expect(updatedUser).toEqual({...oldUser, blocked: !oldUser.blocked});
    });
  });
});
