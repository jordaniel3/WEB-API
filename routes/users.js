const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/user');
const logger = require('../Logging/logger');
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
router.get('/logout', logout);
router.get('/',auth, getAll);
router.post('/', bodyParser(),validateUser, createUser);
router.get('/:id([0-9]{1,})',auth, getById);
router.put('/:id([0-9]{1,})', bodyParser(),auth,validateUser, updateUser);
router.del('/:id([0-9]{1,})',auth, deleteUser);

async function getAll(ctx) {
	ctx.set('Access-Control-Allow-Origin', null); // CORS disabled by default 
	//console.log(ctx.state.user)
	
	const permission = can.readAll(ctx.state.user);
	console.log(permission)
	if (!permission.granted) {
	ctx.status = 403;
	logger.info(`${ctx.state.user.username} was denied access`)
	} else {
		ctx.status = 200;
	const result = await model.getAll();
	if (result.length) {
	ctx.body = result;
	}
	}
   }


async function login(ctx) {
	ctx.set('Access-Control-Allow-Origin', null); // CORS disabled by default 
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
			logger.info(`User ${ctx.request.body.username} has logged in`)
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
async function logout(ctx){
	ctx.set('Access-Control-Allow-Origin', null); // CORS disabled by default 
	await fs.writeFile(
		"fakecookie.json",
		JSON.stringify({Authorisation:` `}),
		(err) => {
			if (err) throw err;
			
			
			
		}
		
	);
	ctx.body = {message: "logged out"}
	logger.info(`User logged out`)
}
async function getById(ctx) {
	ctx.set('Access-Control-Allow-Origin', null); // CORS disabled by default 
	let id = parseInt(ctx.params.id);
	console.log(id)
	const permission = can.read(ctx.state.user,id);
	console.log(permission)
	if (!permission.granted) {
	ctx.status = 403;
	logger.info(`${ctx.state.user.username} was denied access`)
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
			logger.info(`User record ${id} was accessed by ${ctx.state.user.username}`)
	
		}
	}
	

}

async function createUser(ctx) {
	ctx.set('Access-Control-Allow-Origin', null); // CORS disabled by default 
	const body = ctx.request.body;
	body.password = await bcrypt.hash(body.password, saltRounds);
	let result = await model.add(body);

	if (result) {

		ctx.status = 201;

		ctx.body = {
			ID: result.insertId
		}
		logger.info(`User record was created by ${ctx.state.user.firstName} ${ctx.state.user.lastName}`)

	}else{
		console.log(result)
		ctx.status = 400;
	}


}

async function updateUser(ctx) {
	ctx.set('Access-Control-Allow-Origin', null); // CORS disabled by default 
    let id = parseInt(ctx.params.id);
	const permission = can.delete(ctx.state.user,id);
	console.log(permission)
	if (!permission.granted) {
	ctx.status = 403;
	logger.info(`${ctx.state.user.username} was denied access`)
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
	logger.info(`User record ${id} was updated by ${ctx.state.user.username}`)
		
	}
	
}

async function deleteUser(ctx) {
	ctx.set('Access-Control-Allow-Origin', null); // CORS disabled by default 
    let id = parseInt(ctx.params.id);
	
	const permission = can.delete(ctx.state.user,id);
	console.log(ctx.headers)
	if (!permission.granted) {
	ctx.status = 403;
	logger.info(`${ctx.state.user.username} was denied access`)
	} else {
		logger.info(`User record ${id} was deleted by ${ctx.state.user.username}`)
		ctx.status = 410;
		let users = await model.deleteUser(id);
		ctx.body = {message:"user deleted"}
		

		
	}
}
module.exports = router