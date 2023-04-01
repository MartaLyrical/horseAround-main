const validator = require("../helpers/validateBreed");
//validation to create a new diet
const createDiet = (req, res, next) => {
  const validationRule = {
    feedtype: "required|string",
    brand: "required|string",
    product: "required|string",
    source: "required|string",
    price: "required|numeric",
    size: "required|numeric",
    deliveryTime: "required|integer",
    benefits: "required|array"
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
  createDiet,
};
