import Joi from "joi";

const ValidateFormCandidate = Joi.object({
  firstname: Joi.string()
    .min(3)
    .messages({
      "string.empty": "Le prénom est requis",
      "string.min": "Le prénom doit contenir au moins 3 caractères",
      "any.required": "Le prénom est requis",
    })
    .required(),
  lastname: Joi.string()
    .min(3)
    .messages({
      "string.empty": "Le nom est requis",
      "string.min": "Le nom doit contenir au moins 3 caractères",
      "any.required": "Le nom est requis",
    })
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(10)
    .messages({
      "string.empty": "Le numéro de téléphone est requis",
      "string.pattern.base": "Le téléphone doit être un numéro valide",
      "string.min": "Le téléphone doit être un numéro valide",
      "any.required": "Le téléphone doit être un numéro valide",
    })
    .required(),
  city: Joi.string()
    .min(3)
    .messages({
      "string.empty": "Le nom de la ville est requis",
      "string.min": "Le nome de la ville doit contenir au moins 3 caractéres",
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
    .min(3)
    .messages({
      "string.empty": "Le nom est requis",
      "string.min": "Le nom doit contenir au moins 3 caractères",
      "any.required": "Le nom est requis",
    })
    .required(),
  contact: Joi.string()
    .min(3)
    .messages({
      "string.empty": "Le nom du contact est requis",
      "string.min": "Le nom doit contenir au moins 3 caractères",
      "any.required": "Le nom est requis",
    })
    .required(),
  description: Joi.string()
    .min(10)
    .messages({
      "string.empty": "Description est requis",
      "string.min": "Description doit contenir au moins 10 caractères",
      "any.required": "Description est requis",
    })
    .required(),
  website: Joi.string()
    .min(5)
    .messages({
      "any.required": "Site Web est requis",
      "string.empty": "Site Web est requis",
      "string.pattern.base": "Site Web valide est requis",
      "string.min": "Le site Web doit être une URL valide",
      "string.uri": "Le site Web doit être une URL valide",
    })
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(10)
    .messages({
      "string.empty": "Le numéro de téléphone est requis",
      "string.pattern.base": "Le téléphone doit être un numéro valide",
      "string.min": "Le téléphone doit être un numéro valide",
      "any.required": "Le téléphone doit être un numéro valide",
    })
    .required(),
  city: Joi.string()
    .min(3)
    .messages({
      "string.empty": "Le nom de la ville est requis",
      "string.min": "Le nome de la ville doit contenir au moins 3 caractéres",
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
    .min(3)
    .messages({
      "string.empty": "Le prénom est requis",
      "string.min": "Le prénom doit contenir au moins 3 caractères",
      "any.required": "Le prénom est requis",
    })
    .required(),
  lastname: Joi.string()
    .min(3)
    .messages({
      "string.empty": "Le nom est requis",
      "string.min": "Le nom doit contenir au moins 3 caractères",
      "any.required": "Le nom est requis",
    })
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(10)
    .messages({
      "string.empty": "Le numéro de téléphone est requis",
      "string.pattern.base": "Le téléphone doit être un numéro valide",
      "string.min": "Le téléphone doit être un numéro valide",
      "any.required": "Le téléphone doit être un numéro valide",
    })
    .required(),
  city: Joi.string()
    .min(3)
    .messages({
      "string.empty": "Le nom de la ville est requis",
      "string.min": "Le nome de la ville doit contenir au moins 3 caractéres",
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
    .min(3)
    .messages({
      "string.empty": "Le nom est requis",
      "string.min": "Le nom doit contenir au moins 3 caractères",
      "any.required": "Le nom est requis",
    })
    .required(),
  contact: Joi.string()
    .min(1)
    .messages({
      "string.empty": "Le nom du contact est requis",
      "string.min": "Le nom doit contenir au moins 1 caractères",
      "any.required": "Le nom est requis",
    })
    .required(),
  description: Joi.string()
    .min(9)
    .messages({
      "string.empty": "Description est requis",
      "string.min": "Description doit contenir au moins 10 caractères",
      "any.required": "Description est requis",
    })
    .required(),
  website: Joi.string()
    .min(5)
    .messages({
      "any.required": "Site Web est requis",
      "string.empty": "Site Web est requis",
      "string.pattern.base": "Site Web valide est requis",
      "string.min": "Le site Web doit être une URL valide",
      "string.uri": "Le site Web doit être une URL valide",
    })
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(10)
    .messages({
      "string.empty": "Le numéro de téléphone est requis",
      "string.pattern.base": "Le téléphone doit être un numéro valide",
      "string.min": "Le téléphone doit être un numéro valide",
      "any.required": "Le téléphone doit être un numéro valide",
    })
    .required(),
  city: Joi.string()
    .min(3)
    .messages({
      "string.empty": "Le nom de la ville est requis",
      "string.min": "Le nome de la ville doit contenir au moins 3 caractéres",
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
const ValidateFormCreateOffer = Joi.object({
  title: Joi.string()
    .min(3)
    .messages({
      "string.empty": "Titre de l'annonce requis",
      "string.min": "Au moins 3 caractères",
      "any.required": "Titre de l'annonce",
    })
    .required(),
  salary: Joi.string()
    .pattern(/^[0-9]+$/)
    .messages({
      "string.empty": "chiffres uniquement",
      "string.pattern.base": "chiffres uniquement",
      "any.required": "chiffres uniquement",
    }),
  remote: Joi.number()
    .messages({
      "number.base": "Lieu de travail requis",
      "string.empty": "Lieu de travail requis",
      "any.required": "Lieu de travail requis",
      "string.pattern.base": "Lieu de travail requis",
    })
    .required(),
  job_category_id: Joi.number()
    .messages({
      "number.base": "Type de poste requis",
      "string.empty": "Type de poste requis",
      "any.required": "Type de poste requis",
      "string.pattern.base": "Type de poste requis",
    })
    .required(),
  job_type_id: Joi.number()
    .messages({
      "number.base": "Type de contract requis",
      "string.empty": "Type de contract requis",
      "any.required": "Type de contract requis",
    })
    .required(),
  job_location_id: Joi.number()
    .messages({
      "number.base": "Localisation requis",
      "string.empty": "Localisation requis",
      "any.required": "Localisation requis",
    })
    .required(),
}).messages({
  "any.invalid": "Champ requis", // Default message for any other error related to the remote field
});

export {
  ValidateFormCandidate,
  ValidateFormCompany,
  ValidateFormUpdateCandidate,
  ValidateFormUpdateCompany,
  ValidateFormCreateOffer,
};
