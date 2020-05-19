exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('offer_status')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('offer_status').insert([
        {
          offer_status: 'No Offer',
        },
        {
          offer_status: 'Offer Accepted',
        },
        {
          offer_status: 'Offer Declined',
        },
        {
          offer_status: 'no offer status',
        },
      ]);
    });
};
