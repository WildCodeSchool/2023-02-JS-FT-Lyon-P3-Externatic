const models = require("../models");

const browse = (req, res) => {
  models.company
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.company
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
    const { email, phone, city, name, contact, description, website } =
      req.body;

    const userId = req.body.user_id;
    const companyId = parseInt(req.params.id, 10);

    // TODO: Add validations for email, phone, city, password, name, contact, description, website

    // Update user information
    await models.user.update({
      id: userId,
      email,
      phone,
      city,
    });

    // Update company information
    await models.company.update({
      id: companyId,
      user_id: userId,
      name,
      contact,
      description,
      website,
    });

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const add = async (req, res) => {
  try {
    const {
      email,
      phone,
      city,
      hashedPassword,
      name,
      contact,
      description,
      website,
    } = req.body;

    // TODO: Add validations for email, phone, city, password, name, contact, description, website

    // Create a new user entry
    const [userResult] = await models.user.insert({
      email,
      phone,
      city,
      hashedPassword,
    });
    const userId = userResult.insertId;

    // Create a new company entry
    const [companyResult] = await models.company.insert({
      user_id: userId,
      name,
      contact,
      description,
      website,
    });

    res.location(`/companies/${companyResult.insertId}`).sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const destroy = (req, res) => {
  models.company
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

const profile = (req, res) => {
  const id = req.payloads.sub;
  models.company
    .find(id)
    .then(([companies]) => {
      if (companies[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(companies[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  profile,
};
