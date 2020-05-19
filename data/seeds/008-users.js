const bcrypt = require('bcryptjs');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          email: 'haase1020@gmail.com',
          password: bcrypt.hashSync('password', 3),
          first_name: 'Mandi',
          last_name: 'Haase',
          contact_email: 'haase1020@gmail.com',
          track_id: 3,
          admin: true,
          blocked: false,
          cohort: 'Full Time 1',
          location: '111 Happy Lane, Portland, OR 00000',
          graduated: '01/01/2020',
          highest_ed: 'masters degree',
          field_of_study: 'education',
          prior_experience: false,
          tlsl_experience: false,
          employed_company: 'Shopify',
          employed_title: 'full stack developer',
          employed_remote: true,
          employed_start: '04/01/2020',
          resume:
            'https://drive.google.com/file/d/1OzPQqNwjKNKlqP6GC4kCmy6tfQB7MQqq/view?usp=sharing',
          linked_in: 'https://www.linkedin.com/in/mandi-haase-66a0b013/',
          slack: 'Haase1020',
          github: 'https://github.com/haase1020',
          profile_image:
            'https://drive.google.com/file/d/0B6M_KioiSkDpSGkwZ25CN19ZYUE/view?usp=sharing',
        },
        {
          email: 'john@doe.com',
          first_name: 'John',
          last_name: 'Doe',
          password: bcrypt.hashSync('password', 3),
          track_id: 3,
          admin: false,
          blocked: false,
          cohort: 'Full Time 1',
        },
        {
          email: ' jane@doe.come',
          first_name: 'Jane',
          last_name: 'Doe',
          password: bcrypt.hashSync('password', 3),
          track_id: 3,
          admin: false,
          blocked: false,
          cohort: 'Full Time 1',
        },
      ]);
    });
};
