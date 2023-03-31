const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/reviews');
const can = require('../permissions/reviews');
const auth = require('../controllers/auth');
const logger = require('../Logging/logger');
const etag = require('etag');
const xmlparser = require("js2xmlparser");
const {validateReview} = require('../controllers/validation');
const router = Router({
    prefix: '/api/v1/reviews'
});

router.get('/', getAll);
router.post('/', bodyParser(),validateReview,auth, createReview);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', bodyParser(),validateReview,auth, updateReview);
router.del('/:id([0-9]{1,})',auth, deleteReview);

async function getAll(ctx) {
	ctx.set('Access-Control-Allow-Origin', null); // CORS disabled by default 
	console.log("pass")

	let reviews = await model.getAll();

	if (reviews.length) {
		
		ctx.body = {xml :xmlparser.parse("reviews",reviews),
		json: reviews};

	}

}

async function getById(ctx) {
	ctx.set('Access-Control-Allow-Origin', null); // CORS disabled by default 
	let id = ctx.params.id;

	let review = await model.getById(id);

	if (review.length) {

		const data = review[0];
		const {['if-modified-since']: if_modified_since} = ctx.headers;
		if (if_modified_since) {
			const since = Date.parse(if_modified_since);
			const modified = new Date(data.modified);
			if (modified < since) {
				ctx.status = 304;
			}
		}else{
			ctx.status=200;
			}
		data['link']="http://localhost:3000/api/v1/reviews/"

		ctx.body = {xml :xmlparser.parse("review",data),
		json: data};
		ctx.set('Last-Modified', new Date(data.modified).toUTCString());       
		ctx.set('Etag', etag(JSON.stringify(ctx.body)));

	}

}

async function createReview(ctx) {
	ctx.set('Access-Control-Allow-Origin', null); // CORS disabled by default 
	const permission = can.create(ctx.state.user);
	console.log(permission)
	if (!permission.granted) {
		ctx.status = 403;
		logger.info(`${ctx.state.user.username} was denied access`)
	} else {
		const body = ctx.request.body;

		let result = await model.add(body);

		if (result) {

			ctx.status = 201;

			ctx.body = {
				ID: result.insertId
			}
			logger.info(`Review ${result.insertId} added by ${ctx.state.user.username}`)

		}
	}

}

async function updateReview(ctx) {
	ctx.set('Access-Control-Allow-Origin', null); // CORS disabled by default 
    let id =  ctx.params.id;
	
	const permission = can.update(ctx.state.user,ctx.state.user);
	console.log(permission)
	if (!permission.granted) {
		ctx.status = 403;
		logger.info(`${ctx.state.user.username} was denied access`)
	} else {
		
		let update = await model.updateReview(
			id,
			ctx.request.body.Reviewer,
			ctx.request.body.Rating
		)

		if (update.affectedRows!=0) {

			ctx.status = 201;

			ctx.body = {
				message:"Record Updated"
			}
			logger.info(`Review ${id} was updated by ${ctx.state.user.username}`)

		}else{
			ctx.status = 304;

			ctx.body = {
				message:"Record does not exist"
			}
		}
	}
}

async function deleteReview(ctx) {
	ctx.set('Access-Control-Allow-Origin', null); // CORS disabled by default 
    let id = ctx.params.id;
	const permission = can.delete(ctx.state.user,ctx.state.user);
	console.log(permission)
	if (!permission.granted) {
		ctx.status = 403;
		logger.info(`${ctx.state.user.username} was denied access`)
	} else {
		
		logger.info(`Review record ${id} was deleted by ${ctx.state.user.username}`)
		let reviews = await model.deleteReview(id);

		if (reviews.affectedRows!=0) {

			ctx.status = 410;

			ctx.body = {
				message:"Record Deleted"
			}

		}else{
			ctx.status = 304;

			ctx.body = {
				message:"Record does not exist"
			}
		}
	}
}
module.exports = router