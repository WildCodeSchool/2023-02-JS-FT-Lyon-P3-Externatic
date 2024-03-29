const models = require("../models");

const getCandidateByEmailMiddleWare = (req, res, next) => {
  // We just wanna check if candidate exist with this mail
  const { email } = req.body;
  models.candidate
    .findCandidateByEmailWithPassword(email)
    .then(([candidates]) => {
      if (candidates[0]) {
        // if candidate exist, push it to req.candidate so we can access like req.candidate.id, req.candidate.firstname, etc
        [req.candidate] = candidates;
        next();
      } else {
        // If candidate with this mail doesnt exist
        console.warn("Mail doesnt exist");
        res.sendStatus(401);
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const getCompanyByEmailMiddleWare = (req, res, next) => {
  const { email } = req.body;
  models.company
    .findCompanyByEmailWithPassword(email)
    .then(([companies]) => {
      if (companies[0]) {
        [req.company] = companies;
        next();
      } else {
        console.warn("Mail doesnt exist");
        res.sendStatus(401);
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const register = async (req, res) => {
  try {
    const { email, phone, city, hashedPassword, firstname, lastname, admin } =
      req.body;

    // Create a new user entry
    const [userResult] = await models.user.insert({
      email,
      phone,
      city,
      hashedPassword,
      admin,
    });
    const userId = userResult.insertId;

    // Create a new candidate entry
    const [candidateResult] = await models.candidate.insert({
      user_id: userId,
      firstname,
      lastname,
    });

    res.location(`/candidates/${candidateResult.insertId}`).sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const registerCompany = async (req, res) => {
  try {
    const {
      email,
      phone,
      city,
      hashedPassword,
      admin,
      name,
      contact,
      website,
      description,
    } = req.body;

    // Create a new user entry
    const [userResult] = await models.user.insert({
      email,
      phone,
      city,
      hashedPassword,
      admin,
    });
    const userId = userResult.insertId;

    // Create a new candidate entry
    const [companyResult] = await models.company.insert({
      user_id: userId,
      name,
      contact,
      website,
      description,
    });

    res.location(`/companies/${companyResult.insertId}`).sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  getCandidateByEmailMiddleWare,
  getCompanyByEmailMiddleWare,
  register,
  registerCompany,
};
