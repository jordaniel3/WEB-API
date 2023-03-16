module.exports = {

    "$schema": "http://json-schema.org/draft-04/schema#",
    
    "id": "/review",
    
    "title": "Review",
    
    "description": "A movie review",
    
    "type": "object",
    
    "properties": {
    
    "reviewerid": {
    
    "description": "Id of the reviewer",
    
    "type": "integer"
    
    },
    
    "rating": {
    
    "description": "The rating of the Movie",
    
    "type": "number"
    
    }
    
    },
    
    "required": ["reviewerid", "rating"]
    
    }