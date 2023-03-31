const request = require('supertest') 
const app = require('../app')





//TO TEST THIS ROUTE YOU MUST FIRST MAKE A POST REQUEST TO "/login" using {"username": "Jordaniel","password": "admin"}IN POSTMAN OR THUNDERCLIENT ON LIVE SERVER AS THE JWT BEARER TOKEN NEEDS TO BE UPDATED TO ADMIN PERMISSION

xdescribe('schema fail wrong data type', () => {
    it('should NOT create a new movie', async () => {
        const res = await request(app.callback()).post('/api/v1/movies').send({
            title: 'unique_112233',
            year: 'password',
            genre: 'test',
            runtime: 'user',
            language:"English"
        }) 
        expect(res.statusCode).toEqual(400) 
    })
});
xdescribe('create movie', () => {
    it('should create a new movie', async () => {
        const res = await request(app.callback()).post('/api/v1/movies').send({
            title: 'unique_112233',
            year: 2003,
            genre: 'test',
            runtime: 342,
            language:"English"
        }) 
        expect(res.statusCode).toEqual(201) 
    })
});

xdescribe('Schema fail missing ddata', () => {
    it('should not create a new movie', async () => {
        const res = await request(app.callback()).post('/api/v1/movies').send({
            title: 'unique_112233',
            year: 2003,
            runtime: 342,
            language:"English"
        }) 
        expect(res.statusCode).toEqual(400) 
    })
});
xdescribe('read movie', () => {
    it('should read movie', async () => {
        const res = await request(app.callback()).get('/api/v1/movies/2')
        expect(res.statusCode).toEqual(200) 
    })
});
xdescribe('read a non existent movie', () => {
    it('should not read movie', async () => {
        const res = await request(app.callback()).get('/api/v1/movies/91')
        expect(res.statusCode).toEqual(404) 
    })
});

xdescribe('Update Movie', () => {
    it('should update the movie with missing data', async () => {
        const res = await request(app.callback()).put('/api/v1/movies/3').send({
            title: 'unique_112233',
            year: 2003,
            runtime: 342,
            language:"English"
        }) 
        expect(res.statusCode).toEqual(201) 
    })
});
xdescribe('Update non existent movie', () => {
    it('should run into a 304 error', async () => {
        const res = await request(app.callback()).put('/api/v1/movies/66').send({
            title: 'unique_112233',
            year: 2003,
            genre: 'test',
            runtime: 342,
            language:"English"
        }) 
        expect(res.statusCode).toEqual(304) 
    })
});


xdescribe('read all movies', () => {
    it('should return all movies', async () => {
        const res = await request(app.callback()).get('/api/v1/movies')
        expect(res.statusCode).toEqual(200) 
    })
});

xdescribe('Delete movie', () => {
    it('should delete the movie', async () => {
        const res = await request(app.callback()).del('/api/v1/movies/2')
        expect(res.statusCode).toEqual(410) 
    })
});
xdescribe('Delete non existent movie', () => {
    it('should error out', async () => {
        const res = await request(app.callback()).del('/api/v1/movies/234')
        expect(res.statusCode).toEqual(304) 
    })
});