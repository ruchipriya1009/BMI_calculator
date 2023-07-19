const Joi = require("joi");

const validationSchema = Joi.object({
  userId: Joi.string().required(),
  weight: Joi.number().positive().required(),
  height: Joi.number().positive().required(),
  bmi: Joi.number().positive().required(),
});

module.exports = validationSchema;
