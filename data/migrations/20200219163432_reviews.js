exports.up = function (knex) {
  return knex.schema
    .createTable('reviews', tbl => {
      tbl.increments();

      tbl.string('job_title', 128)
        .notNullable();
      tbl.string('job_location')
        .notNullable();
      tbl.integer('salary')
        .notNullable();
      tbl.string('interview')
        .notNullable();
      tbl.integer('interview_rating')
        .notNullable();
      tbl.string('review')
        .notNullable();
      tbl.integer('review_rating')
        .notNullable();
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.integer('company_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('companies')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('reviews');
}