const {
    Validator,
    ValidationError
} = require('jsonschema');

const movieSchema = require('../schemas/movies.schema');
const actorSchema = require('../schemas/actor.schema ');
const reviewSchema = require('../schemas/review.schema');

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
    exports.validateActor =  makeKoaValidator(actorSchema)
    exports.validateReview =  makeKoaValidator(reviewSchema)