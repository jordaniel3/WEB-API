const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/movies');
const etag = require('etag');
const {validateMovie} = require('../controllers/validation');
const router = Router({
    prefix: '/api/v1/movies'
});

router.get('/', getAll);
router.post('/', bodyParser(),validateMovie, createMovie);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', bodyParser(),validateMovie, updateMovie);
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

		const data = movie[0];
		const {['if-modified-since']: if_modified_since} = ctx.headers;
		if (if_modified_since) {
			const since = Date.parse(if_modified_since);
			const modified = new Date(data.modified);
			if (modified < since) {
				ctx.status = 304;
			}
		}

		ctx.body = data;;
		ctx.set('Last-Modified', new Date(data.modified).toUTCString());       
		ctx.set('Etag', etag(JSON.stringify(ctx.body)));

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