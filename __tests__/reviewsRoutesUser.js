const request = require('supertest') 
const app = require('../app')





//TO TEST THIS ROUTE YOU MUST FIRST MAKE A POST REQUEST TO "/login" using {"username": "Jsmith","password": "password"}IN POSTMAN OR THUNDERCLIENT ON LIVE SERVER AS THE JWT BEARER TOKEN NEEDS TO BE UPDATED TO ADMIN PERMISSION

xdescribe('it should NOT a new review', () => {
    it('should NOT create a new review', async () => {
        const res = await request(app.callback()).post('/api/v1/reviews').send({
            Reviewer: 'BBC FILM',
            Rating: 5
        }) 
        expect(res.statusCode).toEqual(403) 
    })
});


xdescribe('read review', () => {
    it('should read the review', async () => {
        const res = await request(app.callback()).get('/api/v1/reviews/2')
        expect(res.statusCode).toEqual(200) 
    })
});
xdescribe('read all reviews', () => {
    it('should read all reviews', async () => {
        const res = await request(app.callback()).get('/api/v1/reviews/')
        expect(res.statusCode).toEqual(200) 
    })
});

xdescribe('Update review', () => {
    it('should not update the review', async () => {
        const res = await request(app.callback()).put('/api/v1/reviews/3').send({
            Reviewer: 'BBC FILM',
            Rating: 5
        }) 
        expect(res.statusCode).toEqual(403) 
    })
});



xdescribe('Delete a review', () => {
    it('should delete the review', async () => {
        const res = await request(app.callback()).del('/api/v1/reviews/2')
        expect(res.statusCode).toEqual(403) 
    })
});