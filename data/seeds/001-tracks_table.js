exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tracks')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('tracks').insert([
        {
          track_name: 'AND',
        },
        {
          track_name: 'DS',
        },
        {
          track_name: 'WEB',
        },
        {
          track_name: 'iOS',
        },
        {
          track_name: 'UX',
        },
      ]);
    });
};
