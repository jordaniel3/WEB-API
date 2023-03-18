const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/movies');
const {getOMDBdata} = require('../integration/OMDB');
const omdb = require('../integration/OMDBmodel');
const etag = require('etag');
const can = require('../permissions/actors');
const auth = require('../controllers/auth');
const {validateMovie,validateMoviePUT} = require('../controllers/validation');

const router = Router({
    prefix: '/api/v1/movies'
});

router.get('/', getAll);
router.post('/', bodyParser(),validateMovie,auth, createMovie);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', bodyParser(),validateMoviePUT,auth, updateMovie);
router.del('/:id([0-9]{1,})',auth, deleteMovie);

async function getAll(ctx) {
	console.log("pass")

	let movies = await model.getAll();

	if (movies.length) {
		
		ctx.body = movies;

	}

}

async function getById(ctx) {

	let id = ctx.params.id;
	console.log(ctx.headers)

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
	console.log(ctx.request.body)
	const permission = can.create(ctx.state.user);
	console.log(permission)
	if (!permission.granted) {
		ctx.status = 403;
	} else {
		const body = ctx.request.body;
		

		
		
		
		let result = await model.add(body);
		let omdbData = await getOMDBdata(body.imdbId)
		let omdbDict = {
			"title":omdbData.data.Title,
			"movieId": result.insertId,
			"imdbId":omdbData.data.imdbID,
			"director": omdbData.data.Director,
			"poster":omdbData.data.Poster,
			"lastModifiedHeader":omdbData.headers['last-modified'],
			"expires": omdbData.headers.expires

		}
		console.log(omdbDict)
		let omdbResult = await omdb.add(omdbDict);
		if (result) {
			if (!omdbResult){
				ctx.body = {
					message:"OMDB API was unable to add to database but the movie record has still been added"
				}
			}else{
				ctx.status = 201;

			ctx.body = {
				ID: result.insertId
			}
		}

			

		}
	}
}

async function updateMovie(ctx) {
    let id =  ctx.params.id;
		
	const permission = can.update(ctx.state.user,ctx.state.user);
	
	if (!permission.granted) {
		ctx.status = 403;
	} else {
		
		let update = await model.updateMovie(
		id,
		ctx.request.body)
		if (!ctx.request.body.imdbId){
			let movie = await model.getById(id);
			let omdbRecord = await omdb.getById(movie[0].imdbId);
			if (movie[0].imdbId){
				
				let omdbData = await getOMDBdata(movie[0].imdbId,omdbRecord[0].lastModifiedHeader,id)
				
			}
		}
		
		

		if (update) {

			ctx.status = 201;

			ctx.body = {
				message:"Record Updated"
			}

		}
	}
}

async function deleteMovie(ctx) {
    let id = ctx.params.id;
	const permission = can.delete(ctx.state.user,ctx.state.user);
	console.log(permission)
	if (!permission.granted) {
		ctx.status = 403;
	} else {
		
		let movies = await model.deleteMovie(id);
	

		if (movies) {

			ctx.status = 201;

			ctx.body = {
				message:"Record Deleted"
			}

		}
	}
}
module.exports = router