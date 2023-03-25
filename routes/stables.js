const express = require('express')

const stablesRouter = express.Router()
const stablesController = require('../controller/stables')
const { tryCatch } = require("../utils/tryCatch")

// GET/allstables/
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

// GET/stables/inventory
stablesRouter.get('/inventory',
    tryCatch(
        stablesController.getInventory
    )
)

// POST/stables/order
stablesRouter.post('/order',
    tryCatch(
        stablesController.orderOne
    )
)

// POST/stables/
stablesRouter.post('/',
    tryCatch(
        stablesController.createOne
    )
)

// GET/stables/{stablesId}
stablesRouter.get('/:id',
    tryCatch(
        stablesController.getOne
    )
)


// DELETE/stables/{stablesId}
stablesRouter.delete('/:id',
    tryCatch(
        //swagger docs code goes here
        stablesController.deleteOne
    )
)

module.exports = stablesRouter