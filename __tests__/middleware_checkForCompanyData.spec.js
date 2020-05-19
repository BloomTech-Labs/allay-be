const {createCompany, createUser, resetTable, request} = require('./utils/');
const db = require('../data/dbConfig');
const signToken = require('../config/token');
const {
  MISSING_REQUIRED_BODY_FIELD,
  MISSING_BODY_INFO_ERROR,
} = require('../config/errors');

const user = createUser();
const company = createCompany();

const required_fields = ['company_name', 'state_id'];

const method = 'post';
const token = signToken(user);

describe('Middleware', () => {
  beforeAll(async () => {
    await resetTable('users');
    await db('users').insert(user);
  });

  describe('checkForCompanyData', () => {
    it('Return 400 if required field is missing', async () => {
      for (const field of required_fields) {
        const fields = {...company};
        delete fields[field];

        const {body, status, type} = await request('/api/companies', {
          method,
          token,
          body: fields,
        });

        expect(status).toEqual(400);
        expect(type).toEqual('application/json');
        expect(body).toEqual({message: MISSING_REQUIRED_BODY_FIELD});
      }
    });

    it('Return 400 if body is empty', async () => {
      const {body, status, type} = await request('/api/companies', {
        method,
        token,
      });

      expect(status).toEqual(400);
      expect(type).toEqual('application/json');
      expect(body).toEqual({message: MISSING_BODY_INFO_ERROR});
    });
  });
});
