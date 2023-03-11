const stablesSchema = require("../Schema/stables");

// GET/stables/inventory
const getInventory = async (req, res) => {
  const stablesInventory = await stablesSchema.find();

  if (!stablesInventory) {
    throw new Error("Something went wrong");
  }

  res.status(200).json(stablesInventory);
};

// GET/allstables/
const getAll = async (req, res) => {
  const allStables = await stablesSchema.find();
  res.status(200).json("stables");
};

module.exports = { getInventory, getAll };
