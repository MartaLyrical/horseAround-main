const express = require("express");

const breedsRouter = express.Router();
const breedsController = require("../controller/breeds");
const validation = require("../middleware/validateBreed");

breedsRouter.get("/", breedsController.getAll);
//adding validation to the post and put
breedsRouter.get("/:id", breedsController.getOne);
breedsRouter.post("/", validation.createBreed, breedsController.createBreed);
breedsRouter.put("/:id", validation.createBreed, breedsController.updateBreed);
breedsRouter.delete("/:id", breedsController.deleteBreed);

module.exports = breedsRouter;
