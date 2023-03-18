const express = require("express");

const breedsRouter = express.Router();
const breedsController = require("../controller/breeds");
const { tryCatch } = require("../utils/tryCatch");

breedsRouter.get("/", tryCatch(breedsController.getAll));

breedsRouter.get("/:id", breedsController.getOne);
breedsRouter.post("/", breedsController.createBreed);
breedsRouter.put("/:id", breedsController.updateBreed);
breedsRouter.delete("/:id", breedsController.deleteBreed);

module.exports = breedsRouter;
