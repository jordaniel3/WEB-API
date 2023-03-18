const db = require('../helpers/database'); //get a single article by its id 
exports.getById = async function getById(id) {
	let query = "SELECT * FROM Users WHERE id = ?";

	let values = [id];
	let data = await db.run_query(query, values);
	return data;
} //list all the Users in the database 
exports.getAll = async function getAll(page, limit, order) { // TODO: use page, limit, order to give pagination 
	let query = "SELECT * FROM Users;";
	let data = await db.run_query(query);
	return data;
} //create a new user in the database 
exports.add = async function add(user) {
	let query = "INSERT INTO Users SET `role` = 'user',?;";
	let data = await db.run_query(query, user);
	return data;
} //delete a user in the database 
exports.deleteUser = async function deleteUser(id) {
	let query = "DELETE FROM Users WHERE id = ?;";
	let data = await db.run_query(query, id);
	return data;
} //update an article in the database 
exports.updateUser = async function updateUser(id,user) {
	let query = "UPDATE Users SET ? WHERE id = ?;";
	let data = await db.run_query(query, [user,id]);
	return data;
} 
exports.findByUsername = async function getByUsername(username) {
	const query = "SELECT * FROM Users WHERE username = ?;";
	const user = await db.run_query(query, username);
	return user;
   }
