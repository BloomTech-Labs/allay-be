const {createUser, resetTable, request} = require('./utils/');
const Users = require('../helpers/users-model');

const user = createUser();

const url = '/api/auth/register';
const method = 'post';

describe('Routers Users', () => {
  beforeEach(async () => {
    await resetTable('users');
  });

  describe('POST /api/auth/register', () => {
    it('Adds user to database and returns user', async () => {
      const {status, type} = await request(url, {method, body: user});

      expect(status).toEqual(201);
      expect(type).toEqual('application/json');

      const newUser = Users.findUserById(user.id);
      expect(newUser).not.toBeUndefined();
      expect(newUser).not.toBeNull();
    });

    it('Return 409 on duplicate', async () => {
      await request(url, {method, body: user});

      const {status, type} = await request(url, {method, body: user});

      expect(status).toEqual(409);
      expect(type).toEqual('application/json');
    });
  });
});
