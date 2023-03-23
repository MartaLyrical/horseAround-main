const { app, server } = require('../app')
const supertest = require('supertest')
const { expect } = require('@jest/globals')
const request = supertest(app)

afterAll(async() => {
    await server.close()
})

describe('Test Handlers', () => {
    test('responds to /stables', async() => {
        const res = await request.get('/stables')
        expect(res.status).toBe(200)
    })
    test('responds to /stables/id', async() => {
        const res = await request.get('/stables/640cac644be6e1bbfa31a31f')
        expect(res.header['content-type']).toBe('application/json; charset=utf-8')
        expect(res.status).toBe(200)
    })
})