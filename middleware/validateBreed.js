const validator = require("../helpers/validateBreed");
//validation to create a new breed
const createBreed = (req, res, next) => {
  const validationRule = {
    breedName: "required|string",
    color: "required|string",
    height: "required|string",
    weight: "required|integer",
    type: "required|string",
    origin: "required|string",
    features: "required|array"
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  createBreed,
};
