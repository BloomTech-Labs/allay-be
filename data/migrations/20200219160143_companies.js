exports.up = function (knex) {
  return knex.schema
    .createTable('companies', tbl => {
      tbl.increments();

      tbl.string('name', 128)
        .notNullable()
        .unique();
      tbl.string('hq_city')
        .notNullable();
      tbl.string('hq_state')
        .notNullable();
    })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('companies');
}