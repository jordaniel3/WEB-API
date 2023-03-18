const passport = require('koa-passport');
const basicAuth = require('../strategies/basic');
const jwt = require('../strategies/jwt');
passport.use(jwt);
module.exports = passport.authenticate(['jwt'], {session:false});