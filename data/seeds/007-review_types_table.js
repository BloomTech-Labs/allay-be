exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('review_types')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('review_types').insert([
        {
          review_type: 'Company',
        },
        {
          review_type: 'Interview',
        },
      ]);
    });
};
