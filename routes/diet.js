const express = require("express");

const dietRouter = express.Router();
const dietController = require("../controller/diet");
const { tryCatch } = require("../utils/tryCatch");

// GET/alldiets/
dietRouter.get("/", tryCatch(dietController.getAll));

// GET/diet/{dietId}
dietRouter.get("/:id", tryCatch(dietController.getSingle));

// POST/diet
dietRouter.post("/", dietController.createDiet);

// PUT/diet
dietRouter.put("/:id", dietController.updateDiet);

// DELETE/diet
dietRouter.delete("/:id", tryCatch(dietController.deleteDiet));

module.exports = dietRouter;
