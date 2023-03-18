const axios = require('axios');
const model = require('./OMDBmodel');
const etag = require('etag');
exports.getOMDBdata = async function getOMDBdata(imdbId = undefined,storedSince=undefined,ID=undefined) {
    let url, res
    
    


    // preprocessing: ensure a default id is set
    if (imdbId !== undefined) {
        // use the given id if it was supplied 
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
    // console.log(res.data)
    // console.log(res.headers)
    // postprocessing: check it was successful and that we have a content length 
    if (res.status == 200) {
        return res
    } else {
        return undefined
    }
}