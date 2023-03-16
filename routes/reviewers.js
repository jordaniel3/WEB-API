const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/reviewers');
const router = Router({
    prefix: '/api/v1/reviewers'
});

router.get('/', getAll);
router.post('/', bodyParser(), createReviewer);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', bodyParser(), updateReviewer);
router.del('/:id([0-9]{1,})', deleteReviewer);

async function getAll(ctx) {
	console.log("pass")

	let reviewers = await model.getAll();

	if (reviewers.length) {
		
		ctx.body = reviewers;

	}

}

async function getById(ctx) {

	let id = ctx.params.id;

	let reviewer = await model.getById(id);

	if (reviewer.length) {

		ctx.body = reviewer[0];

	}

}

async function createReviewer(ctx) {

	const body = ctx.request.body;

	let result = await model.add(body);

	if (result) {

		ctx.status = 201;

		ctx.body = {
			ID: result.insertId
		}

	}

}

async function updateReviewer(ctx) {
    let id =  ctx.params.id;
	let reviewer=ctx.request.body.reviewer
	let update = await model.updateReviewer(id,reviewer)
}

async function deleteReviewer(ctx) {
    let id = ctx.params.id;
	let reviewers = await model.deleteReviewer(id);
}
module.exports = router