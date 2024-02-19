const joi = require("joi");

// Schema for validating the user input
const validUserSchema = joi.object({
  firstname: joi.string().min(2).max(20).required().messages({
    "string.base": "First name must be a string",
    "string.empty": "First name cannot be empty",
    "string.min": "First name must have at least 2 characters",
    "string.max": "First name is too long",
  }),
  lastname: joi.string().min(2).max(20).required().messages({
    "string.base": "First name must be a string",
    "string.empty": "First name cannot be empty",
    "string.min": "First name must have at least 2 characters",
    "string.max": "First name is too long",
  }),

  email: joi.string().email().required().messages({
    "string.empty": "Email cannot be empty",
    "string.email": "Email must be valid",
  }),
  password: joi
    .string()
    .required()
    .min(8)
    .regex(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/))
    .messages({
      "string.empty": "Password cannot be empty.",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter and one number, it should not contain your name also.",
      "string.min": "Password should be at least 8 characters long",
    }),
});

module.exports = validUserSchema;
