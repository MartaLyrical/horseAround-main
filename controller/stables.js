const stablesSchema = require("../Schema/stables");
const stablesOrderSchema = require("../Schema/order");

// GET/stables/inventory
const getInventory = async (req, res) => {
  const stablesInventory = await stablesSchema.find();
  const numberOfHorses = stablesInventory.reduce((total, stablesSchema) => total + stablesSchema.numberOfHorses, 0)

  res.status(200).json(numberOfHorses);
};

// GET/allstables/
const getAll = async (req, res) => {
  const allStables = await stablesSchema.find();
  res.status(200).json(allStables);
};

// GET/stables/{stablesId}
const getOne = async (req, res) => {
  const stable = await stablesSchema.findById(req.params.id)

  if (!stable) {
    throw new Error('ID not found')
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
    throw new Error(`Horse with ID ${orderReq.horseId} already exists`)
  }
  const newOrder = await orderReq.save()
  res.status(201).json(newOrder._id)


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
    throw new Error(`Stable ${stable.name} already on DB`)
  }
  const newStable = await stable.save()
  res.status(201).json(newStable._id)

}

// PUT/stables/{stablesId}
const updateOne = async (req, res) => {
  const { _id } = req.params
  const { name, location, owner, numberOfHorses } = req.body

  // Check if stable with same name, location, and owner already exists
  const existingStable = await stablesSchema.findOne({
    name,
    location,
    owner
  })

  if (existingStable) {
    throw new Error(`Stable '${name}' already exists, check ID '${existingStable._id}'`)
  }

  // Update stable
  const updatedStable = await stablesSchema.findByIdAndUpdate(
    _id, {
    name,
    location,
    owner,
    numberOfHorses
  }, { new: true, runValidators: true }
  )

  res.status(200).json(updatedStable);
}

// DELETE/stables/{stablesId}
const deleteOne = async (req, res) => {

  const removedStables = await stablesSchema.deleteOne({ _id: req.params.id })
  res.status(200).json(removedStables)

}

module.exports = { getInventory, getAll, getOne, createOne, orderOne, updateOne, deleteOne };