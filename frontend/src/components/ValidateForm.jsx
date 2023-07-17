import Joi from "joi";

const ValidateFormCandidate = Joi.object({
  firstname: Joi.string()
    .min(1)
    .messages({
      "string.empty": "Le prénom est requis",
      "string.min": "Le prénom doit contenir au moins 1 caractère",
      "any.required": "Le prénom est requis",
    })
    .required(),
  lastname: Joi.string()
    .min(1)
    .messages({
      "string.empty": "Le nom est requis",
      "string.min": "Le nom doit contenir au moins 1 caractère",
      "any.required": "Le nom est requis",
    })
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(9)
    .messages({
      "string.empty": "Le numéro de téléphone est requis",
      "string.pattern.base": "Le téléphone doit être un numéro valide",
      "string.min": "Le téléphone doit être un numéro valide",
      "any.required": "Le téléphone doit être un numéro valide",
    })
    .required(),
  city: Joi.string()
    .min(1)
    .messages({
      "string.empty": "Le nom de la ville est requis",
      "string.min": "Le nome de la ville doit contenir au moins 1 caractére",
      "any.required": "Le nom de la ville est requis",
    })
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "Email est requis",
      "string.email": "Email doit être valid",
      "any.required": "Email doit être valid",
    })
    .required(),
  password: Joi.string()
    .min(6)
    .max(30)
    .messages({
      "string.empty": "Le mot de passe est requis",
      "string.min": "Le mot de passe doit contenir au moins 6 caractères",
      "string.max": "Le mot de passe ne peut pas dépasser 30 caractères",
      "any.required": "Le mot de passe est requis",
    })
    .required(),
});

//* Form to validate the company
const ValidateFormCompany = Joi.object({
  name: Joi.string()
    .min(1)
    .messages({
      "string.empty": "Le nom est requis",
      "string.min": "Le nom doit contenir au moins 1 caractère",
      "any.required": "Le nom est requis",
    })
    .required(),
  contact: Joi.string()
    .min(1)
    .messages({
      "string.empty": "Le nom du contact est requis",
      "string.min": "Le nom doit contenir au moins 1 caractère",
      "any.required": "Le nom est requis",
    })
    .required(),
  description: Joi.string()
    .min(1)
    .messages({
      "string.empty": "Decription est requis",
      "string.min": "Decription doit contenir au moins 1 caractère",
      "any.required": "Decription est requis",
    })
    .required(),
  website: Joi.string()
    .min(1)
    .messages({
      "string.empty": "Site Web est requis",
      "string.min": "Decription doit contenir au moins 1 caractère",
      "any.required": "Site Web est requis",
    })
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(9)
    .messages({
      "string.empty": "Le numéro de téléphone est requis",
      "string.pattern.base": "Le téléphone doit être un numéro valide",
      "string.min": "Le téléphone doit être un numéro valide",
      "any.required": "Le téléphone doit être un numéro valide",
    })
    .required(),
  city: Joi.string()
    .min(1)
    .messages({
      "string.empty": "Le nom de la ville est requis",
      "string.min": "Le nome de la ville doit contenir au moins 1 caractére",
      "any.required": "Le nom de la ville est requis",
    })
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "Email est requis",
      "string.email": "Email doit être valid",
      "any.required": "Email doit être valid",
    })
    .required(),
  password: Joi.string()
    .min(6)
    .max(30)
    .messages({
      "string.empty": "Le mot de passe est requis",
      "string.min": "Le mot de passe doit contenir au moins 6 caractères",
      "string.max": "Le mot de passe ne peut pas dépasser 30 caractères",
      "any.required": "Le mot de passe est requis",
    })
    .required(),
});

const ValidateFormUpdateCandidate = Joi.object({
  firstname: Joi.string()
    .min(1)
    .messages({
      "string.empty": "Le prénom est requis",
      "string.min": "Le prénom doit contenir au moins 1 caractère",
      "any.required": "Le prénom est requis",
    })
    .required(),
  lastname: Joi.string()
    .min(1)
    .messages({
      "string.empty": "Le nom est requis",
      "string.min": "Le nom doit contenir au moins 1 caractère",
      "any.required": "Le nom est requis",
    })
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(9)
    .messages({
      "string.empty": "Le numéro de téléphone est requis",
      "string.pattern.base": "Le téléphone doit être un numéro valide",
      "string.min": "Le téléphone doit être un numéro valide",
      "any.required": "Le téléphone doit être un numéro valide",
    })
    .required(),
  city: Joi.string()
    .min(1)
    .messages({
      "string.empty": "Le nom de la ville est requis",
      "string.min": "Le nome de la ville doit contenir au moins 1 caractére",
      "any.required": "Le nom de la ville est requis",
    })
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "Email est requis",
      "string.email": "Email doit être valid",
      "any.required": "Email doit être valid",
    })
    .required(),
});

//* Form to validate the update company
const ValidateFormUpdateCompany = Joi.object({
  name: Joi.string()
    .min(1)
    .messages({
      "string.empty": "Le nom est requis",
      "string.min": "Le nom doit contenir au moins 1 caractère",
      "any.required": "Le nom est requis",
    })
    .required(),
  contact: Joi.string()
    .min(1)
    .messages({
      "string.empty": "Le nom du contact est requis",
      "string.min": "Le nom doit contenir au moins 1 caractère",
      "any.required": "Le nom est requis",
    })
    .required(),
  description: Joi.string()
    .min(1)
    .messages({
      "string.empty": "Decription est requis",
      "string.min": "Decription doit contenir au moins 1 caractère",
      "any.required": "Decription est requis",
    })
    .required(),
  website: Joi.string()
    .min(1)
    .messages({
      "string.empty": "Site Web est requis",
      "string.min": "Decription doit contenir au moins 1 caractère",
      "any.required": "Site Web est requis",
    })
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(9)
    .messages({
      "string.empty": "Le numéro de téléphone est requis",
      "string.pattern.base": "Le téléphone doit être un numéro valide",
      "string.min": "Le téléphone doit être un numéro valide",
      "any.required": "Le téléphone doit être un numéro valide",
    })
    .required(),
  city: Joi.string()
    .min(1)
    .messages({
      "string.empty": "Le nom de la ville est requis",
      "string.min": "Le nome de la ville doit contenir au moins 1 caractére",
      "any.required": "Le nom de la ville est requis",
    })
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "Email est requis",
      "string.email": "Email doit être valid",
      "any.required": "Email doit être valid",
    })
    .required(),
});

export {
  ValidateFormCandidate,
  ValidateFormCompany,
  ValidateFormUpdateCandidate,
  ValidateFormUpdateCompany,
};
