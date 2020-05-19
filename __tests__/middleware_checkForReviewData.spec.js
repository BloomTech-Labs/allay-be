const {createReview, createUser, resetTable, request} = require('./utils/');
const db = require('../data/dbConfig');
const signToken = require('../config/token');
const {
  MISSING_REQUIRED_BODY_FIELD,
  MISSING_BODY_INFO_ERROR,
} = require('../config/errors');

const user = createUser();
const review = createReview();

const required_fields = [
  'job_title',
  'city',
  'state_id',
  'salary',
  'company_name',
];

const method = 'post';
const token = signToken(user);

describe('Middleware', () => {
  beforeAll(async () => {
    await resetTable('users');
    await db('users').insert(user);
  });

  describe('checkForReviewData', () => {
    it('Return 400 if required field is missing', async () => {
      for (const field of required_fields) {
        const fields = {...review};
        delete fields[field];

        const {body, status, type} = await request(
          `/api/users/${user.id}/add-review`,
          {
            method,
            token,
            body: fields,
          }
        );

        expect(status).toEqual(400);
        expect(type).toEqual('application/json');
        expect(body).toEqual({message: MISSING_REQUIRED_BODY_FIELD});
      }
    });

    it('Return 400 if body is empty', async () => {
      const {
        body,
        status,
        type,
      } = await request(`/api/users/${user.id}/add-review`, {method, token});

      expect(status).toEqual(400);
      expect(type).toEqual('application/json');
      expect(body).toEqual({message: MISSING_BODY_INFO_ERROR});
    });
  });
});
