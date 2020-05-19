exports.up = function (knex) {
  return knex.schema.createTable('offer_status', tbl => {
    tbl.increments();
    tbl.string('offer_status').notNullable().unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('offer_status');
};
