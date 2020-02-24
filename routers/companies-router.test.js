const request = require('supertest');
const server = require('../api/server.js');
const db = require('../data/dbConfig.js');

// ********************** GET all companies *******************************

describe('GET all companies from /api/auth/organizations', () => {
  beforeEach(async () => {
    await db('reviews').truncate();
    await db('users').truncate();
  });

  it('auth, then GET all companies', function() {
    // register new user
    return request(server)
      .post('/api/auth/register')
      .send({ email: 'ignacio@test.com', username: 'ignaciosm', password: 'test123' })
      .then(res_signup => {
        expect(res_signup.status).toBe(201);
        expect(Array.isArray(res_signup.body)).toBe(true);
        console.log("signup successful");

        // login with user created
        return request(server)
          .post('/api/auth/login')
          .send({ username: 'ignaciosm', password: 'test123' })
          .then(res_login => {
            const token = res_login.body.token;
            expect(res_login.status).toBe(200);
            console.log("login successful");
          
            // GET all companies
            return request(server)
            .get('/api/organizations')
            .set('Authorization', token)
            .then(res_get => {
              expect(res_get.status).toBe(200);
              expect(Array.isArray(res_get.body)).toBe(true);
              console.log("get companies succesfull");
            }) // closes res_get
          }) // closes res_login
      }) // closes res_signup
  })
})  

// ********************** GET company by ID *******************************

describe('GET company by id from /api/auth/organizations/:id', () => {
  beforeEach(async () => {
    await db('reviews').truncate();
    await db('users').truncate();
  });

  it('auth, then GET company by ID', function() {
    // register new user
    return request(server)
      .post('/api/auth/register')
      .send({ email: 'ignacio@test.com', username: 'ignaciosm', password: 'test123' })
      .then(res_signup => {
        expect(res_signup.status).toBe(201);
        expect(Array.isArray(res_signup.body)).toBe(true);
        console.log("signup successful");

        // login with user created
        return request(server)
          .post('/api/auth/login')
          .send({ username: 'ignaciosm', password: 'test123' })
          .then(res_login => {
            const token = res_login.body.token;
            expect(res_login.status).toBe(200);
            console.log("login successful");
          
            // GET all companies
            return request(server)
            .get('/api/organizations/1')
            .set('Authorization', token)
            .then(res_get => {
              expect(res_get.status).toBe(200);
              console.log("get company by id succesfull");
            }) // closes res_get
          }) // closes res_login
      }) // closes res_signup
  })
})  


// ********************** POST new company *******************************

describe('POST new company to /api/auth/organizations', () => {
  beforeEach(async () => {
    await db('reviews').truncate();
    await db('users').truncate();
    await db('companies').truncate();
  });

  it('auth, then POST new company', function() {
    // register new user
    return request(server)
      .post('/api/auth/register')
      .send({ email: 'ignacio@test.com', username: 'ignaciosm', password: 'test123' })
      .then(res_signup => {
        expect(res_signup.status).toBe(201);
        expect(Array.isArray(res_signup.body)).toBe(true);
        console.log("signup successful");

        // login with user created
        return request(server)
          .post('/api/auth/login')
          .send({ username: 'ignaciosm', password: 'test123' })
          .then(res_login => {
            const token = res_login.body.token;
            expect(res_login.status).toBe(200);
            console.log("login successful");
          
            // POST new company
            return request(server)
            .post('/api/organizations')
            .set('Authorization', token)
            .send({ 
              name: "Ignacio Test Company",
              hq_state: "California",
              hq_city: "San Francisco"
             })
            .then(res_post => {
              expect(res_post.status).toBe(201);
              console.log("post new company succesful");
            }) // closes res_get
          }) // closes res_login
      }) // closes res_signup
  })
})    