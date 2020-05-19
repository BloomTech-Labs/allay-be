const {createCompany, resetTable} = require('./utils/');
const db = require('../data/dbConfig');
const Company = require('../helpers/companies-model');

const company = createCompany();

describe('Models Companies', () => {
  beforeAll(async () => {
    await resetTable('companies');
    await db('companies').insert(company);
  });

  describe('updateCompany()', () => {
    it('Update company', async () => {
      const oldReview = await db('companies').where({id: company.id}).first();
      const changes = {company_name: 'test'};

      await Company.updateCompany(1, changes);

      const updatedCompanies = await db('companies')
        .where({id: company.id})
        .first();

      expect({...oldReview, ...changes}).toEqual(updatedCompanies);
    });
  });
});
