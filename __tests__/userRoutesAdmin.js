const request = require('supertest') 
const app = require('../app')





//TO TEST THIS ROUTE YOU MUST FIRST MAKE A POST REQUEST TO "/login" using {"username": "Jordaniel","password": "admin"}IN POSTMAN OR THUNDERCLIENT ON LIVE SERVER AS THE JWT BEARER TOKEN NEEDS TO BE UPDATED TO USER PERMISSIONS
xdescribe('login', () => {
    it('should create a new user', async () => {
        const res = await request(app.callback()).post('/api/v1/users/login').send(
            {username: "Jordaniel",
            password: "admin"
        }) 
        expect(res.statusCode).toEqual(200) 
    })
});
xdescribe('Post new user', () => {
    it('should create a new user', async () => {
        const res = await request(app.callback()).post('/api/v1/users').send({
            username: 'unique_11233',
            password: 'password',
            firstName: 'test',
            lastName: 'user'
        }) 
        expect(res.statusCode).toEqual(201) 
    })
});
xdescribe('Post new user with same username', () => {
    it('should not create a new user', async () => {
        const res = await request(app.callback()).post('/api/v1/users').send({
            username: 'Jsmith',
            password: 'password',
            firstName: 'test',
            lastName: 'user'
        }) 
        expect(res.statusCode).toEqual(400) 
    })
});
xdescribe('Post new user with missing data', () => {
    it('should not create a new user', async () => {
        const res = await request(app.callback()).post('/api/v1/users').send({
            password: 'password',
            firstName: 'test',
            lastName: 'user'
        }) 
        expect(res.statusCode).toEqual(400) 
    })
});
xdescribe('Post new user', () => {
    it('should not create a new user', async () => {
        const res = await request(app.callback()).post('/api/v1/users').send({
            username: 4389,
            password: 'password',
            firstName: 'test',
            lastName: 'user'
        }) 
        expect(res.statusCode).toEqual(400) 
    })
});
xdescribe('Delete admin', () => {
    it('should NOT delete admin', async () => {
        const res = await request(app.callback()).del('/api/v1/users/1')
        expect(res.statusCode).toEqual(403) 
    })
});

xdescribe('Update User', () => {
    it('should update the user', async () => {
        const res = await request(app.callback()).put('/api/v1/users/2').send({
            username: "updatedname",
            password: 'password',
            firstName: 'test',
            lastName: 'user'
        }) 
        expect(res.statusCode).toEqual(200) 
    })
});
xdescribe('Update other User', () => {
    it('should update the user', async () => {
        const res = await request(app.callback()).put('/api/v1/users/3').send({
            username: "updatedname",
            password: 'password',
            firstName: 'test',
            lastName: 'user'
        }) 
        expect(res.statusCode).toEqual(200) 
    })
});

xdescribe('Update User non existent user', () => {
    it('should NOT update the user', async () => {
        const res = await request(app.callback()).put('/api/v1/users/99').send({
            username: "updatedname",
            password: 'password',
            firstName: 'test',
            lastName: 'user'
        }) 
        expect(res.statusCode).toEqual(304) 
    })
});
xdescribe('read all Users', () => {
    it('should return all users', async () => {
        const res = await request(app.callback()).get('/api/v1/users')
        expect(res.statusCode).toEqual(200) 
    })
});
xdescribe('read a user', () => {
    it('should read the user', async () => {
        const res = await request(app.callback()).get('/api/v1/users/3')
        expect(res.statusCode).toEqual(200) 
    })
});
xdescribe('read themself', () => {
    it('should read the user', async () => {
        const res = await request(app.callback()).get('/api/v1/users/1')
        expect(res.statusCode).toEqual(200) 
    })
});
xdescribe('read a non existent user', () => {
    it('error should occur', async () => {
        const res = await request(app.callback()).get('/api/v1/users/91')
        expect(res.statusCode).toEqual(404) 
    })
});
xdescribe(' delete other user', () => {
    it('should delete the other user', async () => {
        const res = await request(app.callback()).del('/api/v1/users/3')
        expect(res.statusCode).toEqual(410) 
    })
});