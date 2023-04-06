const supertest = require('supertest')
const { app, server } = require('../app.js');
const request = supertest(app)

afterAll(() => server.close());

describe('App', () => {
    test('responds to GET / with status code 200', (done) => {
        request
            .get('/')
            .expect(200, done)
    })
    test('responds to GET /login with status code 302', (done) => {
        request
            .get('/login')
            .expect(302, done)
    })
    test('responds to GET /profile with status code 302', (done) => {
        request
            .get('/profile')
            .expect(302, done)
    })
});