const dietSchema = require("../Schema/diet");
const mongoClient = require("../db/mongoClientDb");
const ObjectId = require("mongodb").ObjectId;

// GET/alldiet/
const getAll = async (req, res) => {
  const allDiet = await dietSchema.find();
  res.status(200).json(allDiet);
};

// GET/diet/{dietId}
const getSingle = async (req, res) => {
  const diet = await dietSchema.findById(req.params.id);

  if (!diet) {
    // throw new Error('ID not found');
    res.status(500).json("ID not found. Try again.");
  }

  res.status(200).json(diet);
};

// POST/diet
const createDiet = async (req, res) => {
  console.log("Adding a new diet...");
  const diet = {
    feedtype: req.body.feedtype,
    brand: req.body.brand,
    product: req.body.product,
    source: req.body.source,
    price: req.body.price,
    size: req.body.size,
    deliveryTime: req.body.deliveryTime,
    benefits: req.body.benefits,
  };
  const response = await mongoClient
    .getDb()
    .db()
    .collection("diet")
    .insertOne(diet);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(response.error || "An error happened while creating this record.");
  }
};

// PUT/diet
const updateDiet = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("You must use a valied recipe ID to update a recipe.");
  }
  const dietId = new ObjectId(req.params.id);

  const diet = {
    feedtype: req.body.feedtype,
    brand: req.body.brand,
    product: req.body.product,
    source: req.body.source,
    price: req.body.price,
    size: req.body.size,
    deliveryTime: req.body.deliveryTime,
    benefits: req.body.benefits,
  };
  const response = await mongoClient
    .getDb()
    .db()
    .collection("diet")
    .replaceOne({ _id: dietId }, diet);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while updating this record.");
  }
};

// DELETE/diet
const deleteDiet = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("You must use a valid diet ID to delete a diet.");
  }
  const dietId = new ObjectId(req.params.id);

  const response = await mongoClient
    .getDb()
    .db()
    .collection("diet")
    .deleteOne({ _id: dietId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "An error has occurred while deleting this record."
      );
  }
};

module.exports = {
  getAll,
  getSingle,
  createDiet,
  updateDiet,
  deleteDiet,
};
