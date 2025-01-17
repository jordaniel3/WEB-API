module.exports = {

    "$schema": "http://json-schema.org/draft-04/schema#",
    
    "id": "/movie",
    
    "title": "Movie",
    
    "description": "An movie in the database",
    
    "type": "object",
    
    "properties": {
    
    "title": {
    
    "description": "Main title of the movie",
    
    "type": "string"
    
    },
    
    "year": {
    
    "description": "The year of the Movie",
    
    "type": "integer"
    
    },
    
    "genre": {
    
    "description": "the genre of the movie",
    
    "type": "string"
    
    },
    
    "runtime": {
    
    "description": "URL for main image to show in article",
    
    "type": "integer"
    
    },
    
    "language": {
    
    "description": "The language of movie or show",
    
    "type": "string"
    
    },
    
    "imdbId": {
    
    "description": "The IMDB ID of the movie or show",
    
    "type": "string"
    
    }
    
    },
    
    "required": ["title", "year", "genre","runtime","language"]
    
    }