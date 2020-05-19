const {createUser, resetTable} = require('./utils/');
const db = require('../data/dbConfig');
const User = require('../helpers/users-model');

const user = createUser();

describe('Models Users', () => {
  beforeAll(async () => {
    await resetTable('users');
    await db('users').insert(user);
  });

  describe('findUserById()', () => {
    it('Returns user when user found', async () => {
      const foundUser = await User.findUserById(1);

      expect(foundUser.id).toBe(user.id);
    });

    it('Returns null when no user found', async () => {
      const foundUser = await User.findUserById(2);

      expect(foundUser).toBeNull();
    });
  });
});
