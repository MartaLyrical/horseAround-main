const express = require("express");

const dietRouter = express.Router();
const dietController = require("../controller/diet");
// const { tryCatch } = require("../utils/tryCatch");
const validation = require("../middleware/validateDiet");

// GET/alldiets/
dietRouter.get("/", dietController.getAll);

// GET/diet/{dietId}
dietRouter.get("/:id", dietController.getSingle);

// POST/diet
dietRouter.post("/", validation.createDiet, dietController.createDiet);

// PUT/diet
dietRouter.put("/:id", validation.createDiet, dietController.updateDiet);

// DELETE/diet
dietRouter.delete("/:id", dietController.deleteDiet);

module.exports = dietRouter;
