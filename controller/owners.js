const mongodb = require("../db/mongoClientDb");
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection("owners").find();
  result.toArray().then((lists) => {
    res.status(200).json(lists);
  });
};
const getOne = async (req, res) => {
  try {
    const ownerId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("owners")
      .find({ _id: ownerId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createOwner = async (req, res) => {
  console.log("Adding a new owner...");
  const owner = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailAddress: req.body.emailAddress,
    phone: req.body.phone,
    mailingAddress: req.body.mailingAddress,
    numberOfHorses: req.body.numberOfHorses,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("owners")
    .insertOne(owner);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || "Error, owner not created");
  }
};

const updateOwner = async (req, res) => {
  try {
  const ownerId = new ObjectId(req.params.id);
  const owner = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailAddress: req.body.emailAddress,
    phone: req.body.phone,
    mailingAddress: req.body.mailingAddress,
    numberOfHorses: req.body.numberOfHorses,
  };
  const response = await mongodb
    .getDb()
    .db("horse_breeds")
    .collection("owners")
    .replaceOne({ _id: ownerId }, owner);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Error, the owner was not updated!!!");
  }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteOwner = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid owner id to delete a owner.");
  }
  const ownerId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("owners")
    .deleteOne({ _id: ownerId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the owner."
      );
  }
};

module.exports = {
  getAll,
  getOne,
  createOwner,
  updateOwner,
  deleteOwner,
};
