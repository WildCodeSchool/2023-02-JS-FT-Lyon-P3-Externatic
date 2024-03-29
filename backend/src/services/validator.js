const Joi = require("joi");

const candidateSchema = Joi.object({
  firstname: Joi.string().min(1).required(),
  lastname: Joi.string().min(1).required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(10)
    .required(),
  city: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .ruleset.min(6)
    .max(30)
    .rule({ message: "Password must be between 6 and 30 characters" })
    .required(),
});

// Validate the user input registering as a candidate
const validateCandidate = async (req, res, next) => {
  const { firstname, lastname, phone, city, email, password } = req.body;

  const { error } = candidateSchema.validate(
    { firstname, lastname, phone, city, email, password },
    { abortEarly: false }
  );
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

const companySchema = Joi.object({
  name: Joi.string().min(1).required(),
  contact: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
  website: Joi.string()
    .messages({
      "any.required": "Site Web est requis",
      "string.empty": "Site Web est requis",
      "string.pattern.base": "Site Web valide est requis",
      "string.min": "Decription doit contenir un site web valide ",
    })
    .required(),
  phone: Joi.string()
    .min(10)
    .pattern(/^[0-9]+$/)
    .required(),
  city: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .ruleset.min(6)
    .max(30)
    .rule({ message: "Password must be between 6 and 30 characters" })
    .required(),
});

// Validate the user input registering as a company
const validateCompany = async (req, res, next) => {
  const { email, phone, city, password, name, contact, website, description } =
    req.body;

  const { error } = companySchema.validate(
    {
      email,
      phone,
      city,
      password,
      name,
      contact,
      website,
      description,
    },
    { abortEarly: false }
  );
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

const candidateUpdateSchema = Joi.object({
  firstname: Joi.string().min(1).required(),
  lastname: Joi.string().min(1).required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(10)
    .required(),
  city: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
});

// Validate the candidate input  updating they informaiton
const validateCandidateUpdate = async (req, res, next) => {
  const { firstname, lastname, phone, city, email } = req.body;

  const { error } = candidateUpdateSchema.validate(
    { firstname, lastname, phone, city, email },
    { abortEarly: false }
  );
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

const companyUpdateSchema = Joi.object({
  name: Joi.string().min(1).required(),
  contact: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
  website: Joi.string().min(1).required(),
  phone: Joi.string()
    .min(10)
    .pattern(/^[0-9]+$/)
    .required(),
  city: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
});

// Validate the user input updating as a company
const validateUpdateCompany = async (req, res, next) => {
  const { email, phone, city, name, contact, website, description } = req.body;

  const { error } = companyUpdateSchema.validate(
    {
      email,
      phone,
      city,
      name,
      contact,
      website,
      description,
    },
    { abortEarly: false }
  );
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};
module.exports = {
  validateCandidate,
  validateCompany,
  validateCandidateUpdate,
  validateUpdateCompany,
};
