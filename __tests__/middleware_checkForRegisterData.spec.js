const {createUser, request} = require('./utils/');
const {
  MISSING_REQUIRED_BODY_FIELD,
  MISSING_BODY_INFO_ERROR,
} = require('../config/errors');

const user = createUser();

const required_fields = [
  'first_name',
  'last_name',
  'password',
  'email',
  'cohort',
  'track_id',
];

const method = 'post';

describe('Middleware', () => {
  describe('checkForRegisterData', () => {
    it('Return 400 if required field is missing', async () => {
      for (const field of required_fields) {
        const fields = {...user};
        delete fields[field];

        const {body, status, type} = await request('/api/auth/register', {
          method,
          body: fields,
        });

        expect(status).toEqual(400);
        expect(type).toEqual('application/json');
        expect(body).toEqual({message: MISSING_REQUIRED_BODY_FIELD});
      }
    });

    it('Return 400 if body is empty', async () => {
      const {body, status, type} = await request('/api/auth/register', {
        method,
      });

      expect(status).toEqual(400);
      expect(type).toEqual('application/json');
      expect(body).toEqual({message: MISSING_BODY_INFO_ERROR});
    });
  });
});
