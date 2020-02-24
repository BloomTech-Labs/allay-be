// for configuring knex and our database
require('dotenv').config();

const knex = require('knex');
const config = require('../knexfile');

const dbEnv = process.env.DB_ENV || 'testing';

module.exports = knex(config[dbEnv]);