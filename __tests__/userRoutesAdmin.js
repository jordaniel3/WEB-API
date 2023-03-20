const request = require('supertest') 
const app = require('../app')





//TO TEST THIS ROUTE YOU MUST FIRST MAKE A POST REQUEST TO "/login" using {"username": "Jordaniel","password": "admin"}IN POSTMAN OR THUNDERCLIENT ON LIVE SERVER AS THE JWT BEARER TOKEN NEEDS TO BE UPDATED TO USER PERMISSIONS
describe('login', () => {
    it('should create a new user', async () => {
        const res = await request(app.callback()).post('/api/v1/users/login').send(
            {username: "Jordaniel",
            password: "admin"
        }) 
        expect(res.statusCode).toEqual(200) 
    })
});
describe('Post new user', () => {
    it('should create a new user', async () => {
        const res = await request(app.callback()).post('/api/v1/users').send({
            username: 'unique_112233',
            password: 'password',
            firstName: 'test',
            lastName: 'user'
        }) 
        expect(res.statusCode).toEqual(201) 
    })
});
describe('Post new user', () => {
    it('should not create a new user', async () => {
        const res = await request(app.callback()).post('/api/v1/users').send({
            password: 'password',
            firstName: 'test',
            lastName: 'user'
        }) 
        expect(res.statusCode).toEqual(400) 
    })
});
describe('Post new user', () => {
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
describe('Delete admin', () => {
    it('should NOT delete admin', async () => {
        const res = await request(app.callback()).del('/api/v1/users/1')
        expect(res.statusCode).toEqual(403) 
    })
});

describe('Update User', () => {
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
describe('Update other User', () => {
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

describe('Update User non existent user', () => {
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
describe('read all Users', () => {
    it('should return all users', async () => {
        const res = await request(app.callback()).get('/api/v1/users')
        expect(res.statusCode).toEqual(200) 
    })
});
describe('read a user', () => {
    it('should read the user', async () => {
        const res = await request(app.callback()).get('/api/v1/users/3')
        expect(res.statusCode).toEqual(200) 
    })
});
describe('read themself', () => {
    it('should read the user', async () => {
        const res = await request(app.callback()).get('/api/v1/users/1')
        expect(res.statusCode).toEqual(200) 
    })
});
describe('read a non existent user', () => {
    it('error should occur', async () => {
        const res = await request(app.callback()).get('/api/v1/users/91')
        expect(res.statusCode).toEqual(404) 
    })
});
describe(' delete other user', () => {
    it('should delete the other user', async () => {
        const res = await request(app.callback()).del('/api/v1/users/3')
        expect(res.statusCode).toEqual(410) 
    })
});