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

  describe('GET /api/companies/:companyId', () => {
    it('Return correct body', async () => {
      const {body, status, type} = await request(
        `/api/companies/${company.id}`,
        {token}
      );

      const companyInfo = await Company.findCompanyById(company.id);

      expect(status).toEqual(200);
      expect(type).toEqual('application/json');
      expect(body).toEqual(companyInfo);
    });
  });
});
