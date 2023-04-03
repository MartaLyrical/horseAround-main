const stablesSchema = require("../Schema/stables")
const stablesOrderSchema = require("../Schema/order")
const { IDNotFound, DuplicateError } = require('../errors/customErrors')

// GET/stables/inventory
const getInventory = async (req, res) => {
    const stablesInventory = await stablesSchema.find()
    const numberOfHorses = stablesInventory.reduce((total, stablesSchema) => total + stablesSchema.numberOfHorses, 0)

    res.status(200).json({ "numberOfHorses": `${numberOfHorses}` })
}

// GET/allstables/
const getAll = async (req, res) => {
    const allStables = await stablesSchema.find()
    res.status(200).json(allStables)
}

// GET/stables/{stablesId}
const getOne = async (req, res) => {
    const { id } = req.params
    const stable = await stablesSchema.findById(id)

    if (!stable) {
        const error = new IDNotFound(`Stable with ID ${id} not found`)
        throw error
    }

    res.status(200).json(stable)
}

// POST/stables/order
const orderOne = async (req, res) => {

    const orderReq = new stablesOrderSchema({
        horseId: req.body.horseId,
        stablesId: req.body.horseId
    })

    const existingOrder = await stablesOrderSchema.findOne({ horseId: orderReq.horseId })

    if (existingOrder) {
        const error = new DuplicateError(`Order horse with ID ${orderReq.horseId} is not available`)
        throw error
    }
    const newOrder = await orderReq.save()
    res.status(201).json({ "New Order": `${newOrder._id}` })


}

// POST/stables/
const createOne = async (req, res) => {

    const stable = new stablesSchema({
        name: req.body.name,
        location: req.body.location,
        owner: req.body.owner,
        numberOfHorses: req.body.numberOfHorses
    })

    const createdStable = await stablesSchema.findOne({
        $and: [
            { name: stable.name },
            { location: stable.location },
            { owner: stable.owner }
        ]
    })

    if (createdStable) {
        const error = new DuplicateError(`Stable ${stable.name} already on DB`)
        throw error
    }
    const newStable = await stable.save()
    res.status(201).json({ "Created Stable _Id": `${newStable._id}` })

}

// PUT/stables/{stablesId}
const updateOne = async (req, res) => {
    const { id } = req.params
    const { name, location, owner, numberOfHorses } = req.body

    // Check if stable with given ID exists
    const existingStableById = await stablesSchema.findById(id)
    if (!existingStableById) {
        const error = new IDNotFound(`Stable with ID ${id} not found`)
        throw error
    }

    // Check if stable with same name, location, and owner already exists
    const existingStable = await stablesSchema.findOne({
        $and: [
            { name },
            { location },
            { owner },
            { numberOfHorses }
        ]
    })

    if (existingStable && existingStable.id.toString() !== id) {
        const error = new DuplicateError(`This update creates a duplicate of another saved stable data`)
        throw error
    }

    if (existingStable && existingStable._id.toString() == id) {
        const error = new DuplicateError(`The data you entered has the same data to the original one`)
        throw error

    }

    // Update stable
    const updatedStable = await stablesSchema.findByIdAndUpdate(
        id, {
        name,
        location,
        owner,
        numberOfHorses
    }, { new: true, runValidators: true }
    )

    res.status(200).json(updatedStable)
}

// DELETE/stables/{stablesId}
const deleteOne = async (req, res) => {
    const { id } = req.params
    const stable = await stablesSchema.findById(id)

    if (!stable) {
        const error = new IDNotFound(`Stable with ID ${id} not found`)
        throw error
    }

    const removedStables = await stablesSchema.deleteOne({ _id: req.params.id })
    res.status(200).json(removedStables)

}

module.exports = { getInventory, getAll, getOne, createOne, orderOne, updateOne, deleteOne }