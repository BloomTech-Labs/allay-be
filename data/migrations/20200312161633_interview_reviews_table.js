exports.up = function(knex, Promise) {
  return knex.schema.createTable('interview_reviews', tbl => {
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
      .string('company_name')
      .unsigned()
      .notNullable()
      .references('company_name')
      .inTable('companies')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.string('job_title').notNullable();
    tbl.integer('interview_rounds');
    tbl.integer('overall_rating');
    tbl.integer('difficulty_rating');
    tbl.integer('salary');
    tbl.boolean('phone_interview').defaultTo(false);
    tbl.boolean('resume_review').defaultTo(false);
    tbl.boolean('take_home_assignments').defaultTo(false);
    tbl.boolean('online_coding_assignments').defaultTo(false);
    tbl.boolean('portfolio_review').defaultTo(false);
    tbl.boolean('screen_share').defaultTo(false);
    tbl.boolean('open_source_contribution').defaultTo(false);
    tbl.boolean('side_projects').defaultTo(false);
    tbl.string('comment', 1200);
    tbl
      .string('offer_status')
      .unsigned()
      .notNullable()
      .references('offer_status')
      .inTable('offer_status')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.string('city');
    tbl
      .string('abbreviation')
      .unsigned()
      .notNullable()
      .references('abbreviation')
      .inTable('states')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.raw('now()'));
    tbl
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('interview_reviews');
};
