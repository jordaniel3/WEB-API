module.exports = {

    "$schema": "http://json-schema.org/draft-04/schema#",
    
    "id": "/actor",
    
    "title": "Actor",
    
    "description": "An Actor in movie",
    
    "type": "object",
    
    "properties": {
    
    "FirstName": {
    
    "description": "Main title of the movie",
    
    "type": "string"
    
    },
    
    "LastName": {
    
    "description": "The year of the Movie",
    
    "type": "string"
    
    },
    
    "Gender": {
    
    "description": "the genre of the movie",
    
    "type": "string"
    
    }
    
    },
    
    "required": ["FirstName", "LastName", "Gender"]
    
    }