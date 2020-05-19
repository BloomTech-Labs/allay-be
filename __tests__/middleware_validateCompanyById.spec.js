const {createUser, resetTable, request} = require('./utils/');
const signToken = require('../config/token');
const {COMPANY_NOT_FOUND_ERROR} = require('../config/errors');

const user = createUser();

const token = signToken(user);

describe('Middleware', () => {
  beforeAll(async () => {
    await resetTable('companies');
  });

  describe('validateCompanyById', () => {
    it("Should 404 error if the company doesn't exist", async () => {
      const {body, status, type} = await request('/api/companies/1', {token});

      expect(status).toBe(404);
      expect(type).toBe('application/json');
      expect(body).toEqual({message: COMPANY_NOT_FOUND_ERROR});
    });
  });
});
