const express = require('express')

const stablesRouter = express.Router()
const stablesController = require('../controller/stables')
const { tryCatch } = require("../utils/tryCatch")

// GET/allstables/
stablesRouter.get('/',
    tryCatch(
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
        stablesController.addOrder
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