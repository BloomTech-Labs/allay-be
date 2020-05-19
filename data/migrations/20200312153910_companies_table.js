exports.up = function (knex) {
  return knex.schema.createTable('companies', tbl => {
    tbl.increments();
    tbl.string('company_name').notNullable().unique();
    tbl.string('hq_city').notNullable();
    tbl
      .integer('state_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('states')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.string('domain');
    tbl.string('industry_name');
    tbl.string('size_range');
    tbl.string('linkedin_url');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('companies');
};
