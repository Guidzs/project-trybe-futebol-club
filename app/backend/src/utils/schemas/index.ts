import * as Joi from 'joi';

const loginSchemaRequired = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(6),
});

export default loginSchemaRequired;
