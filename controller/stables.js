const stablesSchema = require("../Schema/stables");

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

  const stablesOrder = await Schema.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true, runValidators: true })

  res.status(204).json(stablesOrder)


}

// DELETE/stables/{stablesId}
const deleteOne = async (req, res) => {

  const removedStables = await Schema.deleteOne({ _id: req.params.id })
  res.status(200).json(removedStables)

}

module.exports = { getInventory, getAll, getOne, orderOne, deleteOne };