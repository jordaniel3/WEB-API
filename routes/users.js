const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/user');
const jwt = require('jsonwebtoken')
const can = require('../permissions/users');
const auth = require('../controllers/auth');
const etag = require('etag');
const fs = require("fs")
const {validateUser} = require('../controllers/validation');
const router = Router({
    prefix: '/api/v1/users'
});
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/login', bodyParser(), login);
router.get('/',auth, getAll);
router.post('/', bodyParser(),validateUser, createUser);
router.get('/:id([0-9]{1,})',auth, getById);
router.put('/:id([0-9]{1,})', bodyParser(),auth,validateUser, updateUser);
router.del('/:id([0-9]{1,})',auth, deleteUser);

async function getAll(ctx) {
	//console.log(ctx.state.user)
	
	const permission = can.readAll(ctx.state.user);
	console.log(permission)
	if (!permission.granted) {
	ctx.status = 403;
	} else {
		ctx.status = 200;
	const result = await model.getAll();
	if (result.length) {
	ctx.body = result;
	}
	}
   }


async function login(ctx) {
	
	if (ctx.request.body.username===undefined){
		ctx.status=400
		ctx.body={message:"No login provided"}
	}else{
	result = await model.findByUsername(ctx.request.body.username);
	result = result[0]
	if (result){
		console.log(ctx.request.body.password)
		if (await bcrypt.compare(ctx.request.body.password, result.password)) {
			const token = jwt.sign({result}, "test")
			ctx.cookies.set("token",token)
			await fs.writeFile(
				"fakecookie.json",
				JSON.stringify({Authorisation:`Bearer ${token}`}),
				(err) => {
					if (err) throw err;
					console.log("local updated")
				}
			);
			ctx.status=200;
			ctx.body = {
				message: `logged in ${ctx.request.body.username} `
			}
		}
		else{
			ctx.status=400;
			ctx.body = {
				message: `Invalid Credentials`
			}
		}
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
	
			ctx.body = data;
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

	}else{
		console.log(result)
		ctx.status = 400;
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
	if (update.affectedRows==0){
		ctx.status= 304;
		ctx.body = {
			message:"the record either does not exist or has already been updated with this data"
		};
	}else{ctx.status=200}
	console.log(update,",###")
		
	}
	
}

async function deleteUser(ctx) {
    let id = parseInt(ctx.params.id);
	
	const permission = can.delete(ctx.state.user,id);
	console.log(ctx.headers)
	if (!permission.granted) {
	ctx.status = 403;
	} else {
		ctx.status = 410;
		let users = await model.deleteUser(id);
		ctx.body = {message:"user deleted"}

		
	}
}
module.exports = router