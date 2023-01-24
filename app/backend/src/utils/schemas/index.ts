import * as Joi from 'joi';

const loginSchemaRequired = Joi.object({
  email: Joi.required(),
  password: Joi.required(),
});

export default loginSchemaRequired;