import * as Joi from 'joi';

export const validationSchema = Joi.object({
  SWAGGER_PASS: Joi.string().required(),
  JWT_ACCESS_KEY: Joi.string().required(),
  PGHOST: Joi.string().required(),
  PGUSER: Joi.string().required(),
  PGPASSWORD: Joi.string().required(),
  HOSVITAL_API_HOST: Joi.string().required(),
  HOSVITAL_API_AUTHORIZATION_KEY: Joi.string().required(),
  AWS_SECRET: Joi.string().required(),
  AWS_KEY_ID: Joi.string().required(),
  AWS_EMAIL: Joi.string().required(),
  AWS_S3_BUCKET_NAME: Joi.string().required(),
});
