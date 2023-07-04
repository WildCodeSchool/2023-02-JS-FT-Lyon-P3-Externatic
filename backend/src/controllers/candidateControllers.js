const fs = require("fs");
const multer = require("multer");

const { v4: uuidv4 } = require("uuid");

const upload = multer({ dest: "./public/uploads/" });

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
    const { email, phone, city, hashedPassword, firstname, lastname } =
      req.body;

    // Créer une nouvelle insertion dans User
    const [userResult] = await models.user.insert({
      email,
      phone,
      city,
      hashedPassword,
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

const uploadCV = (req, res, next) => {
  upload.single("monCV")(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }

    const { originalname, filename } = req.file;

    fs.rename(
      `./public/uploads/${filename}`,
      `./public/uploads/${uuidv4()}-${originalname}`,
      (error) => {
        if (error) {
          console.error(error);
          return res.sendStatus(500);
        }

        console.warn(`./public/uploads/${uuidv4()}-${originalname}`);
        return next();
      }
    );
    return next();
  });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  profile,
  uploadCV,
};
