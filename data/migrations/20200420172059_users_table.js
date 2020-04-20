exports.up = function(knex, Promise) {
    return knex.schema.alterTable('users', tbl => {
      tbl.boolean('admin').notNullable().defaultTo(false);       
    });
  };
  exports.down = function(knex, Promise) {
    return knex.schema.alterTable('users', tbl => {
      tbl.dropColumn('admin');       
    });
  };