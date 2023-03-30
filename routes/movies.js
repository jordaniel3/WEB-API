const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logger = require('../Logging/logger');
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
router.post('/', bodyParser(),auth,validateMovie, createMovie);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', bodyParser(),auth,validateMoviePUT, updateMovie);
router.del('/:id([0-9]{1,})',auth, deleteMovie);

async function getAll(ctx) {
	console.log("pass")

	let movies = await model.getAll();

	if (movies.length) {
		ctx.status=200;
		ctx.body = movies;

	}else{
		ctx.status=400;
		ctx.body={message:"There are no movies"}
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
		ctx.status=200;

		ctx.body = data;;
		ctx.set('Last-Modified', new Date(data.modified).toUTCString());       
		ctx.set('Etag', etag(JSON.stringify(ctx.body)));

	}

}

async function createMovie(ctx) {
	let omdbResult;
	const permission = can.create(ctx.state.user);
	console.log(permission)
	if (!permission.granted) {
		ctx.status = 403;
		logger.info(`${ctx.state.user.username} was denied access`)
	} else {
		const body = ctx.request.body;
		

		
		
		
		let result = await model.add(body);
		if(body.imdbId!=undefined){
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
			omdbResult = await omdb.add(omdbDict);
	}
		
		
		if (result) {
			
			if (!omdbResult){
				ctx.body = {
					
					message:"OMDB API was unable to add to database but the movie record has still been added"
				}
				ctx.status =201;
			}else{
				ctx.status = 201;

			ctx.body = {
				ID: result.insertId
			}
			logger.info(`Movie ${insertId} added by ${ctx.state.user.username}`)
		}

			

		}
	}
}

async function updateMovie(ctx) {
    let id =  ctx.params.id;
		
	const permission = can.update(ctx.state.user,ctx.state.user);
	
	if (!permission.granted) {
		ctx.status = 403;
		logger.info(`${ctx.state.user.username} was denied access`)
	} else {
		
		let update = await model.updateMovie(
		id,
		ctx.request.body)
		if (!ctx.request.body.imdbId){
			let movie = await model.getById(id);
			
			if(!movie.length){
				ctx.status=400
				ctx.body = {
					message:"Record will update with no imdb id"
				}
			}else{
			if (movie[0].imdbId){
				let omdbRecord = await omdb.getById(movie[0].imdbId);
				let omdbData = await getOMDBdata(movie[0].imdbId,omdbRecord[0].lastModifiedHeader,id)
				if (omdbData.affectedRows!=0){
					console.log("the associated movie has also been updated")
				}
			}}
		}
		
		

		if (update.affectedRows!=0) {

			ctx.status = 201;

			ctx.body = {
				message:"Record Updated"
			}
			logger.info(`Movie ${id} updated by ${ctx.state.user.username}`)

		}else{
			ctx.status=304;
			ctx.body = {
			message:"Record does not exist"
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
		logger.info(`${ctx.state.user.username} was denied access`)
	} else {
		
		let movies = await model.deleteMovie(id);
		console.log(movies)
	

		if (movies.affectedRows!=0) {

			ctx.status = 410;

			ctx.body = {
				message:"Record Deleted"
			}
			logger.info(`Movie ${id} deleted by ${ctx.state.user.username}`)

		}else{
			ctx.status = 304;

			ctx.body = {
				message:"Record does not exist"
			}
		}
	}
}
module.exports = router