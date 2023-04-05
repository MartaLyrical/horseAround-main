const express = require('express')

const stablesRouter = express.Router()
const stablesController = require('../controller/stables')
const { tryCatch } = require("../utils/tryCatch")
const errorHandler = require("../middleware/errorHandler")

const { requiresAuth } = require('express-openid-connect')

// GET /stables/
stablesRouter.get('/',
    tryCatch(
        // #swagger.tags = ['Stables']
        // #swagger.summary = 'Displays an array of Stables document.'
        /* #swagger.responses[200] = { 
                  description: 'Success',
                  schema: { $ref: "#/definitions/Stables" }
             } */
        /* #swagger.responses[500] = { 
                  description: 'Internal Server Error',
                  schema: { $ref: "#/definitions/error" }
             } */
        stablesController.getAll
    )
)
// GET /stables/inventory
stablesRouter.get('/inventory',
    tryCatch(
        // #swagger.tags = ['Stables']
        // #swagger.summary = 'Displays sum of numberOfHorses of stables documents.'
        /* #swagger.responses[200] = { 
                  description: 'Success',
                  schema: { $ref: "#/definitions/Stables" }
             } */
        /* #swagger.responses[500] = { 
                  description: 'Internal Server Error',
                  schema: { $ref: "#/definitions/error" }
             } */
        stablesController.getInventory
    )
)

// GET /stables/{stablesId}
stablesRouter.get('/:id',
    tryCatch(
        // #swagger.tags = ['Stables']
        // #swagger.summary = 'Get stable by id.'
        // #swagger.description = 'Provide valid mongodb Id for successful operation.'
        /* #swagger.responses[200] = { 
                  description: 'Success',
                  schema: { $ref: "#/definitions/Stables" }
             } */
        /* #swagger.responses[404] = { 
                  description: 'Not found',
                  schema: { $ref: "#/definitions/error" }
             } */
        /* #swagger.responses[500] = { 
                  description: 'Internal Server Error',
                  schema: { $ref: "#/definitions/error" }
             } */
        stablesController.getOne
    )
)

// POST /stables/
stablesRouter.post('/',
    requiresAuth(),
    tryCatch(
        // #swagger.tags = ['Stables']
        // #swagger.summary = 'Create new stable.'
        // #swagger.description = 'Requires authentication.'
        /* #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Stables data.  Change values to work.',
            required: true,
            schema: { $ref: "#/definitions/createStable" }
        } */
        /* #swagger.responses[201] = { 
                  description: 'Created',
                  schema: { $ref: "#/definitions/mongoDbId" }
             } */
        /* #swagger.responses[401] = { 
                  description: 'Unauthorized',
                  schema: { $ref: "#/definitions/error" }
             } */
        /* #swagger.responses[409] = { 
             description: 'Conflict/Duplicate',
             schema: { $ref: "#/definitions/error" }
        } */
        /* #swagger.responses[500] = { 
                  description: 'Internal Server Error',
                  schema: { $ref: "#/definitions/error" }
             } */
        stablesController.createOne
    )
)

// PUT /stables/{stablesId}
stablesRouter.put('/:id',
    requiresAuth(),
    tryCatch(
        // #swagger.tags = ['Stables']
        // #swagger.summary = 'Update a stable.'
        // #swagger.description = 'Requires authentication and valid mongodbId.'
        /* #swagger.responses[200] = { 
                  description: 'Success',
                  schema: { $ref: "#/definitions/mongoDbId" }
             } */
        /* #swagger.responses[401] = { 
                  description: 'Unauthorized',
                  schema: { $ref: "#/definitions/error" }
             } */
        /* #swagger.responses[404] = { 
             description: 'Not found',
             schema: { $ref: "#/definitions/error" }
        } */
        /* #swagger.responses[409] = { 
             description: 'Conflict/Duplicate',
             schema: { $ref: "#/definitions/error" }
        } */
        /* #swagger.responses[500] = { 
                  description: 'Internal Server Error',
                  schema: { $ref: "#/definitions/error" }
             } */
        stablesController.updateOne
    )
)

// DELETE /stables/{stablesId}
stablesRouter.delete('/:id',
    requiresAuth(),
    tryCatch(
        // #swagger.tags = ['Stables']
        // #swagger.summary = 'Delete a stable.'
        // #swagger.description = 'Requires authentication and valid mongodbId.'
        /* #swagger.responses[200] = { 
                  description: 'Success',
                  schema: { $ref: "#/definitions/successDelete" }
             } */
        /* #swagger.responses[401] = { 
                  description: 'Unauthorized',
                  schema: { $ref: "#/definitions/error" }
             } */
        /* #swagger.responses[404] = { 
             description: 'Not found',
             schema: { $ref: "#/definitions/error" }
        } */
        /* #swagger.responses[500] = { 
                  description: 'Internal Server Error',
                  schema: { $ref: "#/definitions/error" }
             } */
        stablesController.deleteOne
    )
)



// POST /stables/order
stablesRouter.post('/order',
    requiresAuth(),
    tryCatch(
        // #swagger.tags = ['Stables']
        // #swagger.summary = 'Create new order.'
        // #swagger.description = 'Requires authentication.'
        /* #swagger.parameters['obj'] = {
            in: 'body',
            description: 'order information. Change values to work.',
            required: true,
            schema: { $ref: "#/definitions/placeOrder" }
        } */
        /* #swagger.responses[201] = { 
                  description: 'Created',
                  schema: { $ref: "#/definitions/mongoDbId" }
             } */
        /* #swagger.responses[401] = { 
                  description: 'Unauthorized',
                  schema: { $ref: "#/definitions/error" }
             } */
        /* #swagger.responses[409] = { 
             description: 'Conflict/Duplicate',
             schema: { $ref: "#/definitions/error" }
        } */
        /* #swagger.responses[500] = { 
                  description: 'Internal Server Error',
                  schema: { $ref: "#/definitions/error" }
             } */
        stablesController.orderOne
    )
)

stablesRouter.use(errorHandler)

module.exports = stablesRouter