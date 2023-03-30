const axios = require('axios');
const model = require('./OMDBmodel');
const etag = require('etag');


exports.getFromCache = async function getFromCache(id) {
    const result = await model.getById(id);
    console.log(result)
    return result
}

exports.getOMDBdata = async function getOMDBdata(imdbId = undefined,storedSince=undefined,ID=undefined) {
    let url, res
    
    


    // preprocessing: ensure a default id is set
    if (imdbId !== undefined) { 
        console.log("pass")
        url = `http://www.omdbapi.com/?i=${imdbId}&apikey=6c1f1272`
    }
    console.log(url)
    // configure and send the request
    // TODO: include the if-modified-since header here
    //(a date or string will need to be added to this function 's arguments) 
    const config = {
        method: 'get',
        url: url
    }

    res = await axios(config)
    
    if (storedSince !== undefined && ID!==undefined) {
        let {['last-modified']: lastModified} = res.headers;
        if (lastModified) {
			 lastModified = Date.parse(lastModified);
             storedSince = Date.parse(storedSince);
             console.log(lastModified,storedSince)
			if (lastModified > storedSince) {
                console.log("res.headers['last-modified']")
                let omdbDict = {
                    "title":res.data.Title,
                    "movieId": ID,
                    "imdbId":res.data.imdbID,
                    "director": res.data.Director,
                    "poster":res.data.Poster,
                    "lastModifiedHeader":res.headers['last-modified'],
                    "expires": res.headers.expires
        
                }
                await model.updateOMDB(ID,omdbDict)	
			}
            
            

		}
    }

    console.log(res.status)
    if (res.status == 200) {
        return res
    } else {
        return undefined
    }
}