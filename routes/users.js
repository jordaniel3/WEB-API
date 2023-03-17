const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/user');
const can = require('../permissions/users');
const auth = require('../controllers/auth');
const etag = require('etag');
const {validateUser} = require('../controllers/validation');
const router = Router({
    prefix: '/api/v1/users'
});
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.get('/',auth, getAll);
router.post('/', bodyParser(),validateUser, createUser);
router.get('/:id([0-9]{1,})',auth, getById);
router.put('/:id([0-9]{1,})', bodyParser(),auth,validateUser, updateUser);
router.del('/:id([0-9]{1,})',auth, deleteUser);

async function getAll(ctx) {
	console.log("###################")
	const permission = can.readAll(ctx.state.user);
	console.log(permission)
	if (!permission.granted) {
	ctx.status = 403;
	} else {
	const result = await model.getAll();
	if (result.length) {
	ctx.body = result;
	}
	}
   }

async function getById(ctx) {
	let id = parseInt(ctx.params.id);
	console.log(id)
	const permission = can.read(ctx.state.user,id);
	console.log(permission)
	if (!permission.granted) {
	ctx.status = 403;
	} else {
		

		let user = await model.getById(id);
	
		if (user.length) {
	
			const data = user[0];
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
	

}

async function createUser(ctx) {

	const body = ctx.request.body;
	body.password = await bcrypt.hash(body.password, saltRounds);
	let result = await model.add(body);

	if (result) {

		ctx.status = 201;

		ctx.body = {
			ID: result.insertId
		}

	}

}

async function updateUser(ctx) {
    let id = parseInt(ctx.params.id);
	const permission = can.delete(ctx.state.user,id);
	console.log(permission)
	if (!permission.granted) {
	ctx.status = 403;
	} else {
		const body = ctx.request.body;
	body.password = await bcrypt.hash(body.password, saltRounds);

	let update = await model.updateUser(id,body)
	let id = parseInt(ctx.params.id);

		
	}
	
}

async function deleteUser(ctx) {
    let id = parseInt(ctx.params.id);
	
	const permission = can.delete(ctx.state.user,id);
	console.log(permission)
	if (!permission.granted) {
	ctx.status = 403;
	} else {
		let users = await model.deleteUser(id);

		
	}
}
module.exports = router