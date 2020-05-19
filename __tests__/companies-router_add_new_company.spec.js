const {createCompany, createUser, resetTable, request} = require('./utils/');
const signToken = require('../config/token');
const Company = require('../helpers/companies-model');

const company = createCompany();
const user = createUser();

const method = 'post';
const token = signToken(user);

describe('Routers Companies', () => {
  beforeAll(async () => {
    await resetTable('companies');
  });

  describe('POST /api/companies', () => {
    it('Returns correct body', async () => {
      const {body, status, type} = await request('/api/companies', {
        method,
        token,
        body: company,
      });

      expect(status).toEqual(201);
      expect(type).toEqual('application/json');

      const newCompany = await Company.findCompanyById(company.id);

      expect(body).toEqual(newCompany);
    });
  });
});
