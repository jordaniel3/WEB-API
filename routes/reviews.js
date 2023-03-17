const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/reviews');
const etag = require('etag');
const {validateReview} = require('../controllers/validation');
const router = Router({
    prefix: '/api/v1/reviews'
});

router.get('/', getAll);
router.post('/', bodyParser(),validateReview, createReview);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', bodyParser(),validateReview, updateArticle);
router.del('/:id([0-9]{1,})', deleteReview);

async function getAll(ctx) {
	console.log("pass")

	let reviews = await model.getAll();

	if (reviews.length) {
		
		ctx.body = reviews;

	}

}

async function getById(ctx) {

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
		}

		ctx.body = data;;
		ctx.set('Last-Modified', new Date(data.modified).toUTCString());       
		ctx.set('Etag', etag(JSON.stringify(ctx.body)));

	}

}

async function createReview(ctx) {

	const body = ctx.request.body;

	let result = await model.add(body);

	if (result) {

		ctx.status = 201;

		ctx.body = {
			ID: result.insertId
		}

	}

}

async function updateArticle(ctx) {
    let id =  ctx.params.id;
	let update = await model.updateReview(
		id,
		ctx.request.body.reviewerid,
		ctx.request.body.rating
	)
	
}

async function deleteReview(ctx) {
    let id = ctx.params.id;
	let reviews = await model.deleteReview(id);
}
module.exports = router