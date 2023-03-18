const {
    Validator,
    ValidationError
} = require('jsonschema');

const movieSchemaPUT = require('../schemas/movies.schemaPUT');
const movieSchema = require('../schemas/movies.schema');
const actorSchema = require('../schemas/actor.schema ');
const reviewSchema = require('../schemas/review.schema');
const userSchema = require('../schemas/user.schema');

const v = new Validator();
const makeKoaValidator = schema => {

    return async (ctx, next) => {
    
        const validationOptions = {

            throwError: true,
    
            allowUnknownAttributes: false
    
        };
    
        const body = ctx.request.body;
    
        try {
    
            v.validate(body, schema, validationOptions);
    
            await next();
    
        } catch (error) {
    
            if (error instanceof ValidationError) {
    
                ctx.body = error;
    
                ctx.status = 400;
    
            } else {
    
                throw error;
    
            }
    
        }
    
    
    }
    
    }
    exports.validateMovie =  makeKoaValidator(movieSchema)
    exports.validateMoviePUT =  makeKoaValidator(movieSchemaPUT)
    exports.validateActor =  makeKoaValidator(actorSchema)
    exports.validateReview =  makeKoaValidator(reviewSchema)
    exports.validateUser =  makeKoaValidator(userSchema)