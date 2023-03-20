const Koa = require('koa'); 
const Router = require('koa-router'); 
const app = new Koa(); 
const router = new Router()

const movies = require('./routes/movies.js');
const actors = require('./routes/actors.js');
const reviews = require('./routes/reviews.js');

const users = require('./routes/users');

app.use(movies.routes());
app.use(actors.routes());
app.use(reviews.routes());
app.use(users.routes());

module.exports = app; 