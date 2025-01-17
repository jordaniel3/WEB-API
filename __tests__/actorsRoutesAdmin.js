const request = require('supertest') 
const app = require('../app')





//TO TEST THIS ROUTE YOU MUST FIRST MAKE A POST REQUEST TO "/login" using {"username": "Jordaniel","password": "admin"}IN POSTMAN OR THUNDERCLIENT ON LIVE SERVER AS THE JWT BEARER TOKEN NEEDS TO BE UPDATED TO ADMIN PERMISSION

xdescribe('schema fail wrong data type', () => {
    it('should NOT create a new actor', async () => {
        const res = await request(app.callback()).post('/api/v1/actors').send({
            FirstName: 'Tom',
            LastName: 'Hanks',
            Gender: 5
        }) 
        expect(res.statusCode).toEqual(400) 
    })
});
xdescribe('create actor', () => {
    it('should create a new actor', async () => {
        const res = await request(app.callback()).post('/api/v1/actors').send({
            FirstName: 'Tom',
            LastName: 'Hanks',
            Gender: 'Male'
        }) 
        expect(res.statusCode).toEqual(201) 
    })
});

xdescribe('Schema fail missing data', () => {
    it('should not create a new actor', async () => {
        const res = await request(app.callback()).post('/api/v1/actors').send({
            FirstName: 'Tom',
            LastName: 'Hanks'
        }) 
        expect(res.statusCode).toEqual(400) 
    })
});
xdescribe('read actor', () => {
    it('should read actor', async () => {
        const res = await request(app.callback()).get('/api/v1/actors/2')
        expect(res.statusCode).toEqual(200) 
    })
});
xdescribe('read a non existent actor', () => {
    it('should not read actor', async () => {
        const res = await request(app.callback()).get('/api/v1/actors/91')
        expect(res.statusCode).toEqual(404) 
    })
});

xdescribe('Update actor', () => {
    it('should not update the actor with missing data', async () => {
        const res = await request(app.callback()).put('/api/v1/actors/3').send({
            FirstName: 'Tom',
            LastName: 'Hanks'
        }) 
        expect(res.statusCode).toEqual(400) 
    })
});
xdescribe('Update non existent actor', () => {
    it('should run into a 304 error', async () => {
        const res = await request(app.callback()).put('/api/v1/actors/66').send({
            FirstName: 'Tom',
            LastName: 'Hanks',
            Gender: 'Male'
        }) 
        expect(res.statusCode).toEqual(304) 
    })
});


xdescribe('read all actors', () => {
    it('should return all actors', async () => {
        const res = await request(app.callback()).get('/api/v1/actors')
        expect(res.statusCode).toEqual(200) 
    })
});

xdescribe('Delete actor', () => {
    it('should delete the actor', async () => {
        const res = await request(app.callback()).del('/api/v1/actors/2')
        expect(res.statusCode).toEqual(410) 
    })
});
xdescribe('Delete non existent actor', () => {
    it('should error out', async () => {
        const res = await request(app.callback()).del('/api/v1/actors/234')
        expect(res.statusCode).toEqual(304) 
    })
});