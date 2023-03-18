const db = require('../helpers/database'); //get a single article by its id 
exports.getById = async function getById(id) {
	let query = "SELECT * FROM OMDB WHERE imdbId = ?";

	let values = [id];
	let data = await db.run_query(query, values);
	return data;
} //list all the OMDB records in the database 
exports.getAll = async function getAll(page, limit, order) { // TODO: use page, limit, order to give pagination 
	let query = "SELECT * FROM OMDB;";
	let data = await db.run_query(query);
	return data;
} //create a new omdb record in the database 
exports.add = async function add(omdb) {
	let query = "INSERT INTO OMDB SET ?;";
	let data = await db.run_query(query, omdb);
	return data;
} //delete a omdb record in the database 
exports.deleteOMDB = async function deleteOMDB(id) {
	let query = "DELETE FROM OMDB WHERE id = ?;";
	let data = await db.run_query(query, id);
	return data;
} //update an omdb record in the database 
exports.updateOMDB = async function updateOMDB(id,omdb) {
	let query = "UPDATE OMDB SET ? WHERE movieId = ?;";
	let data = await db.run_query(query, [omdb,id]);
	return data;
}
