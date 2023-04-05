const supertest = require('supertest');
const { app, server } = require('../app');
const { expect } = require('@jest/globals');
const request = supertest(app);
const stablesOrderSchema = require('../Schema/order');
const { auth, requiresAuth } = require('express-openid-connect');

// mock module
jest.mock('express-openid-connect', () => ({
    auth: () => (req, res, next) => {
        next()
    },
    requiresAuth: () => (req, res, next) => {
        next()
    },
}))

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

describe('Stables endpoints', () => {
    beforeEach(() => jest.clearAllMocks());
    afterAll(() => server.close());

    test('get /stables should get all stables', async () => {
        const res = await request.get('/stables')
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toBeGreaterThan(0)
    })
    test('post /stables/_id should create a new stable', async () => {
        const res = await request.post('/stables')
            .send(mockStable)
        expect(res.statusCode).toEqual(201)
        expect(res.body).toBeDefined()
        createdMockStableId = res.body['Created Stable _Id']
    })
    test('get /stables/_id should get a specific stable', async () => {
        const res = await request.get(`/stables/${createdMockStableId}`);
        expect(res.statusCode).toEqual(200)
        expect(res.body.name).toEqual(mockStable.name)
        expect(res.body.location).toEqual(mockStable.location);
        expect(res.body.owner).toEqual(mockStable.owner);
        expect(res.body.numberOfHorses).toEqual(mockStable.numberOfHorses);
    })
    test('put /stables/_id should update a stable', async () => {
        const res = await request
            .put(`/stables/${createdMockStableId}`)
            .send({
                name: 'Test Stable Updated',
                location: 'Test Location Updated',
                numberOfHorses: 15,
                owner: 'Test Owner Updated',

            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.name).toEqual('Test Stable Updated');
        expect(res.body.location).toEqual('Test Location Updated');
        expect(res.body.owner).toEqual('Test Owner Updated');
        expect(res.body.numberOfHorses).toEqual(15)
    })

    test('delete /stables/_id should delete a stable', async () => {
        const res = await request.delete(`/stables/${createdMockStableId}`)
        expect(res.statusCode).toEqual(200)
        expect(res.body.deletedCount).toEqual(1)
    })
    test('get /stables/inventory should return the sum of numberOfHorses of all stables', async () => {
        const res = await request.get(`/stables/inventory`)
        expect(res.statusCode).toEqual(200)
        const numberOfHorses = parseInt(res.body.numberOfHorses)
        expect(typeof numberOfHorses).toBe('number')
    })
    test('post /stables/order should create a new order', async () => {
        const res = await request.post(`/stables/order`).send(mockOrder);
        expect(res.statusCode).toEqual(201);
        // makes sure to delete the created order
        await stablesOrderSchema.findByIdAndDelete(res.body['New Order'])
    })
})