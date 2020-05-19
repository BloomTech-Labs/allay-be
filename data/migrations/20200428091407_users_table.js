exports.up = function (knex) {
  return knex('users')
    .del()
    .then(() => {
      return knex.schema.alterTable('users', tbl => {
        tbl.dropColumn('username');
        tbl.string('first_name', 128).notNullable();
        tbl.string('last_name', 128).notNullable();
        tbl.string('contact_email', 128).unique();
        tbl.string('cohort', 128).notNullable();
        tbl.string('location', 256);
        tbl.date('graduated');
        tbl.string('highest_ed', 128);
        tbl.string('field_of_study', 128);
        tbl.boolean('prior_experience');
        tbl.boolean('tlsl_experience');
        tbl.string('employed_company', 128);
        tbl.string('employed_title', 128);
        tbl.boolean('employed_remote');
        tbl.date('employed_start');
        tbl.string('resume');
        tbl.string('linked_in', 128);
        tbl.string('slack', 128);
        tbl.string('github', 128);
        tbl.string('dribble', 128);
        tbl.string('profile_image');
      });
    });
};

exports.down = function (knex) {
  return knex('users')
    .del()
    .then(() => {
      return knex.schema.alterTable('users', tbl => {
        tbl.string('username', 128).notNullable().unique();
        tbl.dropColumn('first_name');
        tbl.dropColumn('last_name');
        tbl.dropColumn('contact_email');
        tbl.dropColumn('cohort');
        tbl.dropColumn('location');
        tbl.dropColumn('graduated');
        tbl.dropColumn('highest_ed');
        tbl.dropColumn('field_of_study');
        tbl.dropColumn('prior_experience');
        tbl.dropColumn('tlsl_experience');
        tbl.dropColumn('employed_company');
        tbl.dropColumn('employed_title');
        tbl.dropColumn('employed_remote');
        tbl.dropColumn('employed_start');
        tbl.dropColumn('resume');
        tbl.dropColumn('linked_in');
        tbl.dropColumn('slack');
        tbl.dropColumn('github');
        tbl.dropColumn('dribble');
        tbl.dropColumn('profile_image');
      });
    });
};
