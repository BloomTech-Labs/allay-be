const faker = require('faker');

const createFakeReview = () => ({
  job_title: faker.name.jobTitle(),
  job_location: faker.address.state(),
  salary: Math.round(Math.floor(50000 + Math.random() * 70000) / 1000) * 1000,
  interview: faker.lorem.paragraph(),
  interview_rating: Math.floor(1 + Math.random() * 5),
  review: faker.lorem.paragraphs(),
  review_rating: Math.floor(1 + Math.random() * 5),
  user_id: Math.floor(1 + Math.random() * 100),
  company_id: Math.floor(1 + Math.random() * 50)
})

exports.seed = function (knex) {
  // Creates 200 fake reviews
  const fakeReviews = [];
  const desiredFakeReviews = 100;
  for (let i = 0; i < desiredFakeReviews; i++) {
    fakeReviews.push(createFakeReview());
  }
  // Deletes ALL existing entries
  return knex('reviews').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('reviews').insert(fakeReviews)
    })
}