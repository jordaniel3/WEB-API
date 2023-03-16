const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/movies');
const router = Router({
    prefix: '/api/v1/movies'
});

router.get('/', getAll);
router.post('/', bodyParser(), createMovie);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', bodyParser(), updateMovie);
router.del('/:id([0-9]{1,})', deleteMovie);

async function getAll(ctx) {
	console.log("pass")

	let movies = await model.getAll();

	if (movies.length) {
		
		ctx.body = movies;

	}

}

async function getById(ctx) {

	let id = ctx.params.id;

	let movie = await model.getById(id);

	if (movie.length) {

		ctx.body = movie[0];

	}

}

async function createMovie(ctx) {

	const body = ctx.request.body;

	let result = await model.add(body);

	if (result) {

		ctx.status = 201;

		ctx.body = {
			ID: result.insertId
		}

	}

}

async function updateMovie(ctx) {
    let id =  ctx.params.id;
	let update = await model.updateMovie(
		id,
		ctx.request.body.title,
		ctx.request.body.year,
		ctx.request.body.genre,
		ctx.request.body.runtime,
		ctx.request.body.language,

	)
}

async function deleteMovie(ctx) {
    let id = ctx.params.id;
	let movies = await model.deleteMovie(id);
}
module.exports = router