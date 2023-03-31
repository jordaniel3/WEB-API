const request = require('supertest') 
const app = require('../app')





//TO TEST THIS ROUTE YOU MUST FIRST MAKE A POST REQUEST TO "/login" using {"username": "Jsmith","password": "password"}IN POSTMAN OR THUNDERCLIENT ON LIVE SERVER AS THE JWT BEARER TOKEN NEEDS TO BE UPDATED TO ADMIN PERMISSION

describe('it should NOT a new actor', () => {
    it('should NOT create a new actor', async () => {
        const res = await request(app.callback()).post('/api/v1/actors').send({
            FirstName: 'Tom',
            LastName: 'Hanks',
            Gender: 'Male'
        }) 
        expect(res.statusCode).toEqual(403) 
    })
});


describe('read actor', () => {
    it('should read the actor', async () => {
        const res = await request(app.callback()).get('/api/v1/actors/2')
        expect(res.statusCode).toEqual(200) 
    })
});
describe('read all actors', () => {
    it('should read all actors', async () => {
        const res = await request(app.callback()).get('/api/v1/actors/')
        expect(res.statusCode).toEqual(200) 
    })
});

describe('Update actor', () => {
    it('should not update the actor', async () => {
        const res = await request(app.callback()).put('/api/v1/actors/3').send({
            FirstName: 'Tom',
            LastName: 'Hanks',
            Gender: 'Male'
        }) 
        expect(res.statusCode).toEqual(403) 
    })
});



describe('Delete a actor', () => {
    it('should delete the actor', async () => {
        const res = await request(app.callback()).del('/api/v1/actors/2')
        expect(res.statusCode).toEqual(403) 
    })
});