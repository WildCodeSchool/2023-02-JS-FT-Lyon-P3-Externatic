const Joi = require("joi");


const userSchema = Joi.object({

  contact: Joi.string().email().max(255).required(),

  name: Joi.string().max(255).required(),

  description: Joi.string().max(255).required(),

  website: Joi.string().max(255).required(),

});


const validateCompany = (req, res, next) => {

  const { name, contact, description, website } = req.body;


  const { error } = userSchema.validate(

    { name, contact, description, website },

    { abortEarly: false }

  );


  if (error) {

    res.status(422).json({ validationErrors: error.details });

  } else {

    next();

  }

};

  module.exports = {
    validateCompany
  };