const faker = require('faker');

const createFakeUser = () => ({
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

exports.seed = function (knex) {
  // Creates 100 fake users
  const fakeUsers = [];
  const desiredFakeUsers = 100;
  for (let i = 0; i < desiredFakeUsers; i++) {
    fakeUsers.push(createFakeUser());
  }
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(fakeUsers)
    })
}