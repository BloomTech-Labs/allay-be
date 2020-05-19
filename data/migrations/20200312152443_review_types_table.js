exports.up = function (knex) {
  return knex.schema.createTable('review_types', tbl => {
    tbl.increments();
    tbl.string('review_type').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('review_types');
};
