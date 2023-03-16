const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/cast');
const router = Router({
    prefix: '/api/v1/cast'
});

router.get('/', getAll);
router.post('/', bodyParser(), createCast);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', bodyParser(), updateArticle);
router.del('/:id([0-9]{1,})', deleteCast);

async function getAll(ctx) {
	console.log("pass")

	let casts = await model.getAll();

	if (casts.length) {
		
		ctx.body = casts;

	}

}

async function getById(ctx) {

	let id = ctx.params.id;

	let cast = await model.getById(id);

	if (cast.length) {

		ctx.body = cast;

	}

}

async function createCast(ctx) {

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
	
}

async function deleteCast(ctx) {
    let id = ctx.params.id;
	let casts = await model.deleteCast(id);
}
module.exports = router