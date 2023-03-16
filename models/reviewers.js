const db = require('../helpers/database'); //get a single article by its id 
exports.getById = async function getById(id) {
	let query = "SELECT * FROM Reviewers WHERE id = ?";

	let values = [id];
	let data = await db.run_query(query, values);
	return data;
} //list all the Reviewers in the database 
exports.getAll = async function getAll(page, limit, order) { // TODO: use page, limit, order to give pagination 
	let query = "SELECT * FROM Reviewers;";
	let data = await db.run_query(query);
	return data;
} //create a new article in the database 
exports.add = async function add(reviewer) {
	let query = "INSERT INTO Reviewers SET ?;";
	let data = await db.run_query(query, reviewer);
	return data;
} //delete a article in the database 
exports.deleteReviewer = async function deleteReviewer(id) {
	let query = "DELETE FROM Reviewers WHERE condition ?;";
	let data = await db.run_query(query, id);
	return data;
} //update a article in the database 
exports.updateReviewer = async function updateReviewer(id,reviewer) {
	let query = "UPDATE Reviewers SET Reviewer = ? WHERE Id = ?;";
	let data = await db.run_query(query, [reviewer,id]);
	return data;
}