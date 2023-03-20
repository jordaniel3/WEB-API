module.exports = {

    "$schema": "http://json-schema.org/draft-04/schema#",
    
    "id": "/review",
    
    "title": "Review",
    
    "description": "A movie review",
    
    "type": "object",
    
    "properties": {
    
    "Reviewer": {
    
    "description": "name of the reviewer",
    
    "type": "string"
    
    },
    
    "Rating": {
    
    "description": "The rating of the Movie",
    
    "type": "number"
    
    }
    
    },
    
    "required": ["Reviewer", "Rating"]
    
    }