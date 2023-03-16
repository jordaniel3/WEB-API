const db = require('../helpers/database'); //get a single Movie by its id 
exports.getById = async function getById(id) {
	let query = "SELECT * FROM Casts WHERE MovieID = ?";

	let values = [id];
	let data = await db.run_query(query, values);
	return data;
} //list all the Casts in the database 
exports.getAll = async function getAll(page, limit, order) { // TODO: use page, limit, order to give pagination 
	let query = "SELECT * FROM Casts;";
	let data = await db.run_query(query);
	return data;
} //create a new Cast in the database 
exports.add = async function add(cast) {
	let query = "INSERT INTO Casts SET ?;";
	let data = await db.run_query(query, cast);
	return data;
} //delete a cast in the database 
exports.deleteCast = async function deleteCast(id) {
	let query = "DELETE FROM Casts WHERE condition ?;";
	let data = await db.run_query(query, id);
	return data;
} //update a cast in the database 
// exports.updateCast = async function updateCast(id,cast) {
// 	let query = "UPDATE Casts SET MovieID =?,ActorID = ? WHERE Id = ?;";
// 	let data = await db.run_query(query, id);
// 	return data;
// }