const validator = require("../helpers/validateBreed");
//validation to create a new owner
const createOwner = (req, res, next) => {
  const validationRule = {
    firstName: "required|string",
    lastName: "required|string",
    emailAddress: "required|string",
    phone: "required|string",
    mailingAddress: "required|string",
    numberOfHorses: "required|integer"
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
  createOwner,
};
