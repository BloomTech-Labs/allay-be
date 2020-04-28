const bcrypt = require ('bcryptjs');
 
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users')
      .del()
      .then(function() {
        // Inserts seed entries
        return knex('users').insert([
          {
            email:'haase1020@gmail.com',
            first_name: 'Mandi',
            last_name: 'Haase',
            password: bcrypt.hashSync("password", 3),
            track_id: 3,
            admin: true,
            blocked: false,
            cohort: 'Full Time 1'
          }, 
        ]);
      });
  };
  