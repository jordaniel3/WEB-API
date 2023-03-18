const BasicStrategy = require('passport-http').BasicStrategy;
const JwtStrategy = require('passport-jwt').Strategy;
const fake = require("../fakecookie.json")
const users = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;


// const checkToken = async (username, password, done) => {
//     let result;
//     try {
//     result = await jwt.verify(fake.Authorisation.substring(7),"test");
//     console.log(result)
//     } catch (error) {
//         console.error(`Error during authentication for user ${username}`);
//         return done(error);
// //     }
    
// }

function getjwt(){
    return fake.Authorisation?.substring(7)
}
const strategy = new JwtStrategy({secretOrKey:"test",
                                    jwtFromRequest:getjwt},
                                    async (token,done)=>{
                                        console.log(token)
                                        return done(null,token.result)
                                    });
module.exports = strategy;