const request = require('supertest');
const server = require('../api/server');
const Users = require('../helpers/users-model');
const db = require('../data/dbConfig');

describe('server.js', () => {
  beforeEach(async () => {
    await db('users').truncate(); //clears table for testing purposes before each test
  })

  /*************************** GENERAL *******************************/

  it('runs the tests', () => {
    expect(true).toBe(true);
  })

  /*************************** REGISTER *******************************/

  describe('POST /auth/register', () => {
    it('should add a user to the database', async () => {
      //checks that the database is empty
      const users = await db('users');
      expect(users).toHaveLength(0);
      //adds a user to the database
      await Users.addUser({
        username: 'cloudStrife',
        password: 'midgar',
        email: 'cloud@gaea.com'
      })
      //open the database and see that the new user is there
      const newUsers = await db('users');
      expect(newUsers).toHaveLength(1);
    })
    it('check the name of the added user is correct', async () => {
      //checks that the database is empty
      const users = await db('users');
      expect(users).toHaveLength(0);
      //adds a user to the database
      await Users.addUser({
        username: 'solid snake',
        password: 'FOXDIE',
        email: 'snake@shadowmoses.com'
      })
      //open the database and see that the new user is there
      const newUsers = await db('users');
      expect(newUsers[0].username).toBe('solid snake');
    })
    it('should return 201 OK status when adding a user', () => {
      return request(server).post('/api/auth/register')
        .send({
          username: 'joker',
          password: 'phantomthieves',
          email: 'joker@shibuya.com'
        })
        .expect(201);
    })
    it('should return 500 error status if username is not unique / already exists in the database', async () => {
      //adding a user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'link',
          password: 'triforce',
          email: 'link@hyrule.com'
        })
        .expect(201);
      //adding a second user with the same username as the first
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'link',
          password: 'mastersword',
          email: 'link@lorule.com'
        })
        .expect(500);
    })
    it('should return 500 error status if email is not unique / already exists in the database', async () => {
      //adding a user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'mario',
          password: 'mushroom',
          email: 'mario@mushroomkingdom.com'
        })
        .expect(201);
      //adding a second user with the same email as the first
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'drMario',
          password: 'mushroom',
          email: 'mario@mushroomkingdom.com'
        })
        .expect(500);
    })
  })

  /*************************** LOGIN *******************************/

})