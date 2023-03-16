const db = require('../helpers/database'); //get a single movie by its id 
exports.getById = async function getById(id) {
	let query = "SELECT * FROM Movies WHERE id = ?";

	let values = [id];
	let data = await db.run_query(query, values);
	return data;
} //list all the Movies in the database 
exports.getAll = async function getAll(page, limit, order) { // TODO: use page, limit, order to give pagination 
	let query = "SELECT * FROM Movies;";
	let data = await db.run_query(query);
	return data;
} //create a new movie in the database 
exports.add = async function add(movie) {
	let query = "INSERT INTO Movies SET ?;";
	let data = await db.run_query(query, movie);
	return data;
} //delete a movie in the database 
exports.deleteMovie = async function deleteMovie(id) {
	let query = "DELETE FROM Movies WHERE condition ?;";
	let data = await db.run_query(query, id);
	return data;
} //update a movie in the database 
exports.updateMovie = async function updateMovie(id,title,year,genre,runtime,language) {
	let query = "UPDATE Movies SET Title =?,Year = ?,Genre = ?,Runtime = ?,Language = ? WHERE id = ?;";
	let data = await db.run_query(query, [title,year,genre,runtime,language,id]);
	return data;
}