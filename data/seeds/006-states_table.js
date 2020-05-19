exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('states')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('states').insert([
        {
          state_name: 'AL',
        },
        {
          state_name: 'AK',
        },
        {
          state_name: 'AZ',
        },
        {
          state_name: 'AR',
        },
        {
          state_name: 'CA',
        },
        {
          state_name: 'CO',
        },
        {
          state_name: 'CT',
        },
        {
          state_name: 'DE',
        },
        {
          state_name: 'FL',
        },
        {
          state_name: 'GA',
        },
        {
          state_name: 'HI',
        },
        {
          state_name: 'ID',
        },
        {
          state_name: 'IL',
        },
        {
          state_name: 'IN',
        },
        {
          state_name: 'IA',
        },
        {
          state_name: 'KS',
        },
        {
          state_name: 'KY',
        },
        {
          state_name: 'LA',
        },
        {
          state_name: 'ME',
        },
        {
          state_name: 'MD',
        },
        {
          state_name: 'MA',
        },
        {
          state_name: 'MI',
        },
        {
          state_name: 'MN',
        },
        {
          state_name: 'MS',
        },
        {
          state_name: 'MO',
        },
        {
          state_name: 'MT',
        },
        {
          state_name: 'NE',
        },
        {
          state_name: 'NV',
        },
        {
          state_name: 'NH',
        },
        {
          state_name: 'NJ',
        },
        {
          state_name: 'NM',
        },
        {
          state_name: 'NY',
        },
        {
          state_name: 'NC',
        },
        {
          state_name: 'ND',
        },
        {
          state_name: 'OH',
        },
        {
          state_name: 'OK',
        },
        {
          state_name: 'OR',
        },
        {
          state_name: 'PA',
        },
        {
          state_name: 'RI',
        },
        {
          state_name: 'SC',
        },
        {
          state_name: 'SD',
        },
        {
          state_name: 'TN',
        },
        {
          state_name: 'TX',
        },
        {
          state_name: 'UT',
        },
        {
          state_name: 'VT',
        },
        {
          state_name: 'VA',
        },
        {
          state_name: 'WA',
        },
        {
          state_name: 'WV',
        },
        {
          state_name: 'WI',
        },
        {
          state_name: 'WY',
        },
        {
          state_name: 'Remote',
        },
        {
          state_name: 'Unknown',
        },
      ]);
    });
};
