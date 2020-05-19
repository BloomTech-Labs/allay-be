exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('work_status')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('work_status').insert([
        {
          work_status: 'Current Employee',
        },
        {
          work_status: 'Former Employee',
        },
        {
          work_status: 'Full Time',
        },
        {
          work_status: 'Part Time',
        },
        {
          work_status: 'Intern',
        },
        {
          work_status: 'no work status',
        },
      ]);
    });
};
