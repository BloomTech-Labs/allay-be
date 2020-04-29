const bcrypt = require('bcryptjs');


function createUser({
                      id = 1,
                      email = 'default@default.com',
                      password = 'password',
                      first_name = 'John',
                      last_name = 'Doe',
                      cohort = 'Foo',
                      track_id = 1,
                      admin = false,
                      blocked = false
} = {}) {
  return {id, password: bcrypt.hashSync(password), email, first_name, last_name, cohort, track_id, admin, blocked};
}

module.exports = createUser;
