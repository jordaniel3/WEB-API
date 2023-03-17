const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const etag = require('etag');
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

		const data = cast[0];
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