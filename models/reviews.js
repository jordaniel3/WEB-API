const db = require('../helpers/database'); //get a single review by its id 
exports.getById = async function getById(id) {
	let query = "SELECT * FROM Reviews WHERE id = ?";

	let values = [id];
	let data = await db.run_query(query, values);
	return data;
} //list all the Reviews in the database 
exports.getAll = async function getAll(page, limit, order) { // TODO: use page, limit, order to give pagination 
	let query = "SELECT * FROM Reviews;";
	let data = await db.run_query(query);
	return data;
} //create a new review in the database 
exports.add = async function add(review) {
	let query = "INSERT INTO Reviews SET ?;";
	let data = await db.run_query(query, review);
	return data;
} //delete a review in the database 
exports.deleteReview = async function deleteReview(id) {
	let query = "DELETE FROM Reviews WHERE condition ?;";
	let data = await db.run_query(query, id);
	return data;
} //update a review in the database 
exports.updateReview = async function updateReview(id,reviewerid,rating) {
	let query = "UPDATE Reviews SET ReviewerID =?,Rating =? WHERE MovieID = ? ;";
	let data = await db.run_query(query, [reviewerid,rating,id]);
	return data;
}