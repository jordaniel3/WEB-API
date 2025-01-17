const request = require('supertest') 
const app = require('../app')





//TO TEST THIS ROUTE YOU MUST FIRST MAKE A POST REQUEST TO "/login" using {"username": "Jordaniel","password": "admin"}IN POSTMAN OR THUNDERCLIENT ON LIVE SERVER AS THE JWT BEARER TOKEN NEEDS TO BE UPDATED TO ADMIN PERMISSION

xdescribe('schema fail wrong data type', () => {
    it('should NOT create a new review', async () => {
        const res = await request(app.callback()).post('/api/v1/reviews').send({
            Reviewer: 'BBC FILM',
            Rating: "5tffg"
        }) 
        expect(res.statusCode).toEqual(400) 
    })
});
xdescribe('create review', () => {
    it('should create a new review', async () => {
        const res = await request(app.callback()).post('/api/v1/reviews').send({
            Reviewer: 'BBC FILM',
            Rating: 5
        }) 
        expect(res.statusCode).toEqual(201) 
    })
});

xdescribe('Schema fail missing data', () => {
    it('should not create a new review', async () => {
        const res = await request(app.callback()).post('/api/v1/reviews').send({
            FirstName: 'BBC FILM'
        }) 
        expect(res.statusCode).toEqual(400) 
    })
});
xdescribe('read review', () => {
    it('should read review', async () => {
        const res = await request(app.callback()).get('/api/v1/reviews/2')
        expect(res.statusCode).toEqual(200) 
    })
});
xdescribe('read a non existent review', () => {
    it('should not read review', async () => {
        const res = await request(app.callback()).get('/api/v1/reviews/91')
        expect(res.statusCode).toEqual(404) 
    })
});

xdescribe('Update review', () => {
    it('should not update the review with missing data', async () => {
        const res = await request(app.callback()).put('/api/v1/reviews/3').send({
            Reviewer: 'BBC FILM'
        }) 
        expect(res.statusCode).toEqual(400) 
    })
});
xdescribe('Update non existent review', () => {
    it('should run into a 304 error', async () => {
        const res = await request(app.callback()).put('/api/v1/reviews/66').send({
            Reviewer: 'BBC FILM',
            Rating: 5
        }) 
        expect(res.statusCode).toEqual(304) 
    })
});


xdescribe('read all reviews', () => {
    it('should return all reviews', async () => {
        const res = await request(app.callback()).get('/api/v1/reviews')
        expect(res.statusCode).toEqual(200) 
    })
});

xdescribe('Delete review', () => {
    it('should delete the review', async () => {
        const res = await request(app.callback()).del('/api/v1/reviews/2')
        expect(res.statusCode).toEqual(410) 
    })
});
xdescribe('Delete non existent review', () => {
    it('should error out', async () => {
        const res = await request(app.callback()).del('/api/v1/reviews/234')
        expect(res.statusCode).toEqual(304) 
    })
});