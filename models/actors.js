const db = require('../helpers/database'); //get a single article by its id 
exports.getById = async function getById(id) {
	let query = "SELECT * FROM Actors WHERE id = ?";

	let values = [id];
	let data = await db.run_query(query, values);
	return data;
} //list all the Actors in the database 
exports.getAll = async function getAll(page, limit, order) { // TODO: use page, limit, order to give pagination 
	let query = "SELECT * FROM Actors;";
	let data = await db.run_query(query);
	return data;
} //create a new actor in the database 
exports.add = async function add(actor) {
	let query = "INSERT INTO Actors SET ?;";
	let data = await db.run_query(query, actor);
	return data;
} //delete a actor in the database 
exports.deleteActor = async function deleteActor(id) {
	let query = "DELETE FROM Actors WHERE condition ?;";
	let data = await db.run_query(query, id);
	return data;
} //update an article in the database 
exports.updateActor = async function updateActor(id,first,last,gender) {
	let query = "UPDATE Actors SET FirstName =?,LastName = ?,Gender = ? WHERE Id = ?;";
	let data = await db.run_query(query, [first,last,gender,id]);
	return data;
}