const {createUser, request, resetTable} = require('./utils/');
const db = require('../data/dbConfig');
const signToken = require('../config/token');
const User = require('../helpers/users-model');

const admin = createUser({admin: true});
const user = createUser({id: 2, email: 'other@user.com'});

const token = signToken(admin);

describe('Routers Users', () => {
  beforeAll(async () => {
    await resetTable('users');
    await db('users').insert([admin, user]);
  });

  describe('GET /api/users/all', () => {
    it('Should return proper body', async () => {
      const {body, status, type} = await request('/api/users/all', {token});

      expect(status).toBe(200);
      expect(type).toBe('application/json');

      const allUsers = await User.findUsers();

      expect(body).toEqual(allUsers);
    });
  });
});
