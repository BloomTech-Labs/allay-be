exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('companies')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('companies').insert([
        {
          company_name: 'Google',
          hq_city: 'Mountain View',
          domain: 'google.com',
          state_id: 5,
          industry_name: 'Internet',
          size_range: '10001+',
          linkedin_url: 'linkedin.com/company/google'
        },
      ]);
    });
};
