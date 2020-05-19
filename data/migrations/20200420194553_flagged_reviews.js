exports.up = function (knex) {
  return knex.schema.createTable('flagged_reviews', tbl => {
    tbl.increments();
    tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('review_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('reviews')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  });
};
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('flagged_reviews');
};
