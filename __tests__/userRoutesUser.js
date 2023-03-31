const request = require('supertest') 
const app = require('../app')





//TO TEST THIS ROUTE YOU MUST FIRST MAKE A POST REQUEST TO "/login" using {"username": "Jsmith","password": "password"}IN POSTMAN OR THUNDERCLIENT ON LIVE SERVER AS THE JWT BEARER TOKEN NEEDS TO BE UPDATED TO ADMIN PERMISSION
describe('login', () => {
    it('should login', async () => {
        const res = await request(app.callback()).post('/api/v1/users/login').send(
            {username: "Jsmith",
            password: "password"
        }) 
        expect(res.statusCode).toEqual(200) 
    })
});
describe('login wrong details', () => {
    it('should NOT login', async () => {
        const res = await request(app.callback()).post('/api/v1/users/login').send(
            {username: "Jsmith",
            password: "pNMCassword"
        }) 
        expect(res.statusCode).toEqual(400) 
    })
});
describe('login no details', () => {
    it('should NOT login', async () => {
        const res = await request(app.callback()).post('/api/v1/users/login').send(
            {}) 
        expect(res.statusCode).toEqual(400) 
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
describe('read themself', () => {
    it('should not read the user', async () => {
        const res = await request(app.callback()).get('/api/v1/users/2')
        expect(res.statusCode).toEqual(200) 
    })
});
describe('read a non existent user', () => {
    it('should not read the user', async () => {
        const res = await request(app.callback()).get('/api/v1/users/91')
        expect(res.statusCode).toEqual(403) 
    })
});

describe('Update User', () => {
    it('should not update the user', async () => {
        const res = await request(app.callback()).put('/api/v1/users/3').send({
            username: "updatedname",
            password: 'password',
            firstName: 'test',
            lastName: 'user'
        }) 
        expect(res.statusCode).toEqual(403) 
    })
});
describe('Update User', () => {
    it('should update themself', async () => {
        const res = await request(app.callback()).put('/api/v1/users/2').send({
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
        expect(res.statusCode).toEqual(403) 
    })
});
describe('read all Users', () => {
    it('should  not return all users', async () => {
        const res = await request(app.callback()).get('/api/v1/users')
        expect(res.statusCode).toEqual(403) 
    })
});
describe('read a user', () => {
    it('should not read the user', async () => {
        const res = await request(app.callback()).get('/api/v1/users/1')
        expect(res.statusCode).toEqual(403) 
    })
});
describe('Delete User', () => {
    it('should delete the user', async () => {
        const res = await request(app.callback()).del('/api/v1/users/2')
        expect(res.statusCode).toEqual(410) 
    })
});
describe('Delete others', () => {
    it('should not delete others', async () => {
        const res = await request(app.callback()).del('/api/v1/users/3')
        expect(res.statusCode).toEqual(403) 
    })
});