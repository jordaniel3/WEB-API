const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/actors');
const etag = require('etag');
const can = require('../permissions/actors');
const auth = require('../controllers/auth');
const {validateActor} = require('../controllers/validation');
const router = Router({
    prefix: '/api/v1/actors'
});

router.get('/', getAll);
router.post('/', bodyParser(),validateActor,auth, createActor);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', bodyParser(),validateActor,auth, updateActor);
router.del('/:id([0-9]{1,})',auth, deleteActor);

async function getAll(ctx) {
	
	console.log("pass")

	let actors = await model.getAll();

	if (actors.length) {
		
		ctx.body = actors;

	}

}


async function getById(ctx) {

	let id = ctx.params.id;

	let actor = await model.getById(id);

	if (actor.length) {

		const data = actor[0];
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

async function createActor(ctx) {

	
	const permission = can.create(ctx.state.user);
	console.log(permission)
	if (!permission.granted) {
		ctx.status = 403;
	} else {
		const body = ctx.request.body;

		let result = await model.add(body);

		if (result) {

			ctx.status = 201;

			ctx.body = {
				ID: result.insertId
			}

		}
	}
	
	

}

async function updateActor(ctx) {
    let id =  ctx.params.id;
	
	const permission = can.update(ctx.state.user,ctx.state.user);
	console.log(permission)
	if (!permission.granted) {
		ctx.status = 403;
	} else {
		
		let update = await model.updateActor(id,ctx.request.body.first,ctx.request.body.last,ctx.request.body.gender)

		if (update) {

			ctx.status = 201;

			ctx.body = {
				message:"Record Updated"
			}

		}
	}
}

async function deleteActor(ctx) {
    let id = ctx.params.id;
	const permission = can.delete(ctx.state.user,ctx.state.user);
	console.log(permission)
	if (!permission.granted) {
		ctx.status = 403;
	} else {
		
		
	let actors = await model.deleteActor(id);

		if (actors) {

			ctx.status = 201;

			ctx.body = {
				message:"Record Deleted"
			}

		}
	}
}
module.exports = router