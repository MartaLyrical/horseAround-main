const express = require('express')

const stablesRouter = express.Router()
const stablesController = require('../controller/stables')
const { tryCatch } = require("../utils/tryCatch")
const errorHandler = require("../middleware/errorHandler")

// GET /stables/
stablesRouter.get('/',
    tryCatch(
        // #swagger.tags = ['Stables']
        // #swagger.description = 'Displays an array of Stables document.'
        /* #swagger.responses[200] = { 
                  description: 'Returns all stables document in stables collection',
                  schema: { $ref: "#/definitions/Stables" }
             } */
        stablesController.getAll
    )
)
// GET /stables/inventory
stablesRouter.get('/inventory',
    tryCatch(
        stablesController.getInventory
    )
)

// GET /stables/{stablesId}
stablesRouter.get('/:id',
    tryCatch(
        stablesController.getOne
    )
)

// POST /stables/
stablesRouter.post('/',
    tryCatch(
        stablesController.createOne
    )
)

// PUT /stables/{stablesId}
stablesRouter.put('/:id',
    tryCatch(
        stablesController.updateOne
    )
)

// DELETE /stables/{stablesId}
stablesRouter.delete('/:id',
    tryCatch(
        //swagger docs code goes here
        stablesController.deleteOne
    )
)



// POST /stables/order
stablesRouter.post('/order',
    tryCatch(
        stablesController.orderOne
    )
)

stablesRouter.use(errorHandler)

module.exports = stablesRouter