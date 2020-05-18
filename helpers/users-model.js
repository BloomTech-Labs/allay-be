const db = require('../data/dbConfig');
const {find, findBy, findById, add, update, remove} = require('./base-model');


function process(method, ...args) {
	return method('users', ...args);
}


// FIND ALL USERS
function findUsers() {
	return process(find);
}


// FIND USERS BY A SPECIFIC FILTER (MUST BE A COLUMN IN THE USERS TABLE AND USE {<ARGUMENT>})
function findUsersBy(filter, first = false) {
	return process(findBy, filter, first);
}


// FIND USER BY ID, WILL CONTAIN ANY REVIEWS ASSOCIATED WITH THE USER OR AN EMPTY ARRAY
function findUserById(id) {
	return process(findById, id);
}


// FIND USER PASSWORD BY ID
function findUserPassword(id) {
	return db('users')
		.select('password')
		.where({id})
		.first();
}


// FIND ONLY THE COMPANY REVIEWS ASSOCIATED WITH A USER
function findUserReviews(userId) {
	return findBy('reviews', {user_id: userId});
}


// ADD A USER TO THE DATABASE
function addUser(user) {
	return process(add, user);
}


// UPDATE AN EXISTING USER
function updateUser(id, changes) {
	return process(update, id, changes);
}


// DELETE AN EXISTING USER
function deleteUser(id) {
	return process(remove, id);
}


module.exports = {
	findUsers,
	findUsersBy,
	findUserById,
	findUserPassword,
	findUserReviews,
	addUser,
	updateUser,
	deleteUser,
};
