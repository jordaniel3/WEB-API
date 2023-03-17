module.exports = {

    "$schema": "http://json-schema.org/draft-04/schema#",
    
    "id": "/user",
    
    "title": "User",
    
    "description": "A user",
    
    "type": "object",
    
    "properties": {
    
    "firstName": {
    
    "description": "First name",
    
    "type": "string"
    
    },
    
    "lastName": {
    
    "description": "last name",
    
    "type": "string"
    
    },
    
    "password": {
    
    "description": "password"
    
    },
    "userName": {
    
        "description": "User name",
        
        "type": "string"
        
        }
    
    },
    
    "required": ["firstName", "lastName", "password","username"]
    
    }