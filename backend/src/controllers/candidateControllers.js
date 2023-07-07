const fs = require("fs");

const { v4: uuidv4 } = require("uuid");

const models = require("../models");

const browse = (req, res) => {
  models.candidate
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const profile = (req, res) => {
  const id = req.payloads.sub;
  models.candidate
    .find(id)
    .then(([candidates]) => {
      if (candidates[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(candidates[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.candidate
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = async (req, res) => {
  try {
    const { email, phone, city, hashedPassword, firstname, lastname, admin } =
      req.body;

    // Créer une nouvelle insertion dans User
    const [userResult] = await models.user.insert({
      email,
      phone,
      city,
      hashedPassword,
      admin,
    });
    const userId = userResult.insertId;

    // Créer une nouvelle insertion dans Candidate
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

const edit = async (req, res) => {
  try {
    const { email, phone, city, password, firstname, lastname, cv } = req.body;
    const userId = req.body.user_id;
    const candidateId = parseInt(req.params.id, 10);

    // Update user information
    await models.user.update({
      id: userId,
      email,
      phone,
      city,
      password,
    });

    // Update candidate information
    await models.candidate.update({
      id: candidateId,
      user_id: userId,
      firstname,
      lastname,
      cv,
    });

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const destroyByLastName = (req, res) => {
  const { lastname } = req.query;

  if (!lastname) {
    res.sendStatus(400);
    return;
  }

  models.candidate
    .deleteByLastName(lastname)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const uploadCV = (req, res) => {
  const { originalname, filename } = req.file;

  fs.rename(
    `./public/uploads/cv/${filename}`,
    `./public/uploads/cv/${uuidv4()}-${originalname}`,
    (error) => {
      if (error) {
        console.error(error);
        return res.sendStatus(500);
      }

      console.warn(`./public/uploads/cv/${uuidv4()}-${originalname}`);
      return res.sendStatus(200);
    }
  );
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroyByLastName,
  profile,
  uploadCV,
};
