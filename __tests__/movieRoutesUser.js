const request = require('supertest') 
const app = require('../app')





//TO TEST THIS ROUTE YOU MUST FIRST MAKE A POST REQUEST TO "/login" using {"username": "Jsmith","password": "password"}IN POSTMAN OR THUNDERCLIENT ON LIVE SERVER AS THE JWT BEARER TOKEN NEEDS TO BE UPDATED TO ADMIN PERMISSION

xdescribe('it should NOT a new movie', () => {
    it('should NOT create a new movie', async () => {
        const res = await request(app.callback()).post('/api/v1/movies').send({
            title: 'unique_112233',
            year: 2003,
            genre: 'test',
            runtime: 342,
            language:"English"
        }) 
        expect(res.statusCode).toEqual(403) 
    })
});


xdescribe('read movie', () => {
    it('should read the movie', async () => {
        const res = await request(app.callback()).get('/api/v1/movies/2')
        expect(res.statusCode).toEqual(200) 
    })
});
xdescribe('read all movies', () => {
    it('should read all movies', async () => {
        const res = await request(app.callback()).get('/api/v1/movies/')
        expect(res.statusCode).toEqual(200) 
    })
});

xdescribe('Update movie', () => {
    it('should not update the movie', async () => {
        const res = await request(app.callback()).put('/api/v1/movies/3').send({
            title: 'unique_112233',
            year: 2003,
            genre: 'test',
            runtime: 342,
            language:"English"
        }) 
        expect(res.statusCode).toEqual(403) 
    })
});



xdescribe('Delete a Movie', () => {
    it('should delete the user', async () => {
        const res = await request(app.callback()).del('/api/v1/movies/2')
        expect(res.statusCode).toEqual(403) 
    })
});