exports.up = function (knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();
    tbl.string('username', 128).notNullable().unique();
    tbl.string('email', 128).notNullable().unique();
    tbl.string('password');
    tbl
      .integer('track_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('tracks')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
