const {createCompany, createUser, resetTable, request} = require('./utils/');
const db = require('../data/dbConfig');
const signToken = require('../config/token');
const Company = require('../helpers/companies-model');

const company = createCompany();
const user = createUser();

const token = signToken(user);

describe('Routers Companies', () => {
  beforeAll(async () => {
    await resetTable('companies');
    await db('companies').insert(company);
  });

  describe('GET /api/companies', () => {
    it('Returns correct body', async () => {
      const {body, status, type} = await request('/api/companies', {token});

      expect(status).toEqual(200);
      expect(type).toEqual('application/json');

      const companies = await Company.findCompanies();

      expect(body).toEqual(companies);
    });
  });
});
