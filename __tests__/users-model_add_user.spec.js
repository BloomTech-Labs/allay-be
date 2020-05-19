const {createUser, resetTable} = require('./utils/');
const db = require('../data/dbConfig');
const User = require('../helpers/users-model');

const user = createUser();

describe('Models Users', () => {
  beforeEach(async () => {
    await resetTable('users');
  });

  describe('addUser()', () => {
    it('New user gets added to database', async () => {
      await User.addUser(user);

      const newUser = await db('users').where('id', user.id).first();

      expect(newUser).not.toBeUndefined();
    });

    it('Returns result of FindUserById', async () => {
      const addedUser = await User.addUser(user);

      const newUser = await User.findUserById(user.id);

      expect(addedUser).toEqual(newUser);
    });

    it('Adding duplicate user causes errors', async () => {
      await User.addUser(user);

      await expect(User.addUser(user)).rejects.toBeTruthy();
    });
  });
});
