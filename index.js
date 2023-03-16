const Koa = require('koa'); 
const Router = require('koa-router'); 
const app = new Koa(); 
const router = new Router()

const movies = require('./routes/movies.js');
const actors = require('./routes/actors.js');
const reviews = require('./routes/reviews.js');
const reviewers = require('./routes/reviewers');
const casts = require('./routes/cast.js');

app.use(movies.routes());
app.use(actors.routes());
app.use(reviews.routes());
app.use(reviewers.routes());
app.use(casts.routes());

let port = process.env.PORT || 3000;
app.listen(port)