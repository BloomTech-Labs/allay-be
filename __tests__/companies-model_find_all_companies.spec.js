const {createCompany, resetTable} = require('./utils/');
const db = require('../data/dbConfig');
const Company = require('../helpers/companies-model');

const company = createCompany();

describe('Models Companies', () => {
  beforeAll(async () => {
    await resetTable('companies');
    await db('companies').insert(company);
  });

  describe('findCompanies()', () => {
    it('Gets all companies', async () => {
      const companies = await Company.findCompanies();
      expect(companies).toHaveLength(1);
      expect(companies[0]).toEqual(company);
    });
  });
});
