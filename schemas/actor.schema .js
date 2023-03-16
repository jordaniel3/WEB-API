module.exports = {

    "$schema": "http://json-schema.org/draft-04/schema#",
    
    "id": "/actor",
    
    "title": "Actor",
    
    "description": "An Actor in movie",
    
    "type": "object",
    
    "properties": {
    
    "first": {
    
    "description": "Main title of the movie",
    
    "type": "string"
    
    },
    
    "last": {
    
    "description": "The year of the Movie",
    
    "type": "string"
    
    },
    
    "gender": {
    
    "description": "the genre of the movie",
    
    "type": "string"
    
    }
    
    },
    
    "required": ["first", "last", "gender"]
    
    }