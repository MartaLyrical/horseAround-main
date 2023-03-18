const breedsSchema = require("../Schema/breeds");
const mongodb = require("../db/mongoClientDb");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection("breeds").find();
  result.toArray().then((lists) => {
    res.status(200).json(lists);
  });
};

// const getOne = async (req, res) => {
//   try {
//     const breedId = new ObjectId(req.params.id);
//     const result = await mongodb
//       .getDb()
//       .db()
//       .collection("breeds")
//       .findOne({ _id: breedId });
//     result.toArray().then((lists) => {
//       res.setHeader("Content-Type", "application/json");
//       res.status(200).json(lists[0]);
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// GET/breeds/{breedsId}
const getOne = async (req, res) => {
  const breeds = await breedsSchema.findById(req.params.id);

  if (!breeds) {
    // throw new Error('ID not found');
    res.status(500).json("ID not found. Try again.");
  }

  res.status(200).json(breeds);
};

const createBreed = async (req, res) => {
  console.log("Adding a new horse breed...");
  const breed = {
    breedName: req.body.breedName,
    color: req.body.color,
    height: req.body.height,
    weight: req.body.weight,
    type: req.body.type,
    origin: req.body.origin,
    features: req.body.features,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("breeds")
    .insertOne(breed);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || "Error, horse breed not created");
  }
};

const updateBreed = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a horse breed id to update a breed.");
  }
  const breedId = new ObjectId(req.params.id);
  const breed = {
    breedName: req.body.breedName,
    color: req.body.color,
    height: req.body.height,
    weight: req.body.weight,
    type: req.body.type,
    origin: req.body.origin,
    features: req.body.features,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("breeds")
    .replaceOne({ _id: breedId }, breed);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Error, the horse breed was not updated!!!");
  }
};

const deleteBreed = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid horse breed id to delete a breed.");
  }
  const breedId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("breeds")
    .deleteOne({ _id: breedId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the horse breed."
      );
  }
};

module.exports = {
  getAll,
  getOne,
  createBreed,
  updateBreed,
  deleteBreed,
};
