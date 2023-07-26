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

const edit = async (req, res) => {
  try {
    const { email, phone, city, firstname, lastname } = req.body;
    const userId = req.body.user_id;
    const candidateId = parseInt(req.params.id, 10);

    // Update user information
    await models.user.update({
      id: userId,
      email,
      phone,
      city,
    });

    // Update candidate information
    await models.candidate.update({
      id: candidateId,
      user_id: userId,
      firstname,
      lastname,
    });

    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const destroy = (req, res) => {
  models.candidate
    .delete(req.params.id)
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

const uploadCV = async (req, res) => {
  const { originalname, filename } = req.file;
  const cvPath = `${uuidv4()}-${originalname}`;

  try {
    await fs.promises.rename(
      `./public/cv/${filename}`,
      `./public/cv/${cvPath}`
    );

    const candidateId = req.payloads.sub;

    await models.candidate.updateCV({
      id: candidateId,
      cv: cvPath,
    });

    res.send({ cvPath });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = {
  browse,
  read,
  edit,
  destroy,
  profile,
  uploadCV,
};
