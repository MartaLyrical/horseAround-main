const supertest = require('supertest');
const { app, server } = require('../app');
const { expect } = require('@jest/globals');
const request = supertest(app);


const mockStable = {
    name: 'Test Stable',
    location: 'Test Location',
    numberOfHorses: 10,
    owner: 'Test Owner',

}

const mockOrder = {
    horseId: '641b8e52f65dc13092d5bd01',
    stablesId: '641b8e52f65dc13092d5bd01'
}

let createdMockStableId
let firstStableId

describe('Stables endpoints when not logged in', () => {
    afterAll(() => server.close());
    test('get /stables should get all stables and a 200 status code', async () => {
        const res = await request.get('/stables')
        firstStableId = res.body[0]._id
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toBeGreaterThan(0)
    })
    test('post /stables should be redirected and a 302 status code', async () => {
        const res = await request.post('/stables')
            .send(mockStable)
        expect(res.statusCode).toEqual(302)
        expect(res.body).toBeDefined()
    })
    test('get /stables/_id should get a specific stable and a 200 status code', async () => {
        const res = await request.get(`/stables/${firstStableId}`);
        expect(res.statusCode).toEqual(200)
    })
    test('put /stables/_id should be redirected and a 302 status code', async () => {
        const res = await request
            .put(`/stables/${firstStableId}`)
            .send({
                name: 'Test Stable Updated',
                location: 'Test Location Updated',
                numberOfHorses: 15,
                owner: 'Test Owner Updated',

            })
        expect(res.statusCode).toEqual(302)
    })

    test('delete /stables/_id should be redirected and a 302 status code', async () => {
        const res = await request.delete(`/stables/${createdMockStableId}`)
        expect(res.statusCode).toEqual(302)
    })

    test('get /stables/inventory should return the sum of numberOfHorses of all stables', async () => {
        const res = await request.get(`/stables/inventory`)
        expect(res.statusCode).toEqual(200)
        const numberOfHorses = parseInt(res.body.numberOfHorses)
        expect(typeof numberOfHorses).toBe('number')
    })
    test('post /stables/order should be redirected and a 302 status code', async () => {
        const res = await request.post(`/stables/order`).send(mockOrder);
        expect(res.statusCode).toEqual(302);
    })
})