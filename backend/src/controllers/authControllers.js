const models = require("../models");

const getCandidateByEmailMiddleWare = (req, res, next) => {
  // We just wanna check if candidate exist with this mail
  const { email } = req.body;
  models.candidate
    .findByEmailWithPassword(email)
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

const register = async (req, res) => {
  try {
    const { email, phone, city, hashedPassword, firstname, lastname } =
      req.body;

    // Create a new user entry
    const [userResult] = await models.user.insert({
      email,
      phone,
      city,
      hashedPassword,
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

module.exports = {
  getCandidateByEmailMiddleWare,
  register,
};
