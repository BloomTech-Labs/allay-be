exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users')
      .del()
      .then(function() {
        // Inserts seed entries
        return knex('users').insert([
          {
            username: 'Mandi Haase',
            email:'haase1020@gmail.com',
            password:'password',
            track_id:3,
            admin: true,
            blocked: false
          }, 
        ]);
      });
  };
  