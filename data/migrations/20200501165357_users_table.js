
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('users', function(tbl){
        tbl.string('portfolio')
    })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', function(tbl){
      tbl.dropColumn('portfolio')
  })
};
