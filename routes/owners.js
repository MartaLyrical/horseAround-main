const express = require("express");

const ownersRouter = express.Router();
const ownersController = require("../controller/owners");
const validation = require("../middleware/validateOwner");

ownersRouter.get("/", ownersController.getAll);
//adding validation to the post and put
ownersRouter.get("/:id", ownersController.getOne);
ownersRouter.post("/", validation.createOwner, ownersController.createOwner);
ownersRouter.put("/:id", validation.createOwner, ownersController.updateOwner);
ownersRouter.delete("/:id", ownersController.deleteOwner);

module.exports = ownersRouter;