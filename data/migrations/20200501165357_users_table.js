exports.up = function (knex) {
  return knex.schema.alterTable('users', function (tbl) {
    tbl.string('portfolio');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('users', function (tbl) {
    tbl.dropColumn('portfolio');
  });
};
