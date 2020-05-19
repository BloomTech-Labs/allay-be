const {createUser, resetTable, request} = require('./utils/index');
const signToken = require('../config/token');
const {USER_NOT_FOUND_ERROR} = require('../config/errors.js');

const user = createUser();

const token = signToken(user);

describe('Middleware', () => {
  beforeAll(async () => {
    await resetTable('users');
  });

  describe('validateUserById', () => {
    it("Should 404 if user doesn't exist", async () => {
      const {body, status, type} = await request('/api/users/1', {token});

      expect(status).toBe(404);
      expect(type).toBe('application/json');
      expect(body).toEqual({message: USER_NOT_FOUND_ERROR});
    });
  });
});
