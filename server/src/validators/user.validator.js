const Joi = require("joi");

const userValidator = {
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
};

function validateUser(data) {
  const schema = Joi.object(userValidator);

  const { error, value } = schema.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }

  return value;
}

module.exports = 
 
  validateUser

