const express = require("express");

const fs = require("fs");
const multer = require("multer");

const { v4: uuidv4 } = require("uuid");

const upload = multer({ dest: "./public/uploads/" });

const routerCandidate = express.Router();

const candidateControllers = require("../controllers/candidateControllers");

routerCandidate.get("/candidates", candidateControllers.browse);
routerCandidate.get("/candidates/:id", candidateControllers.read);
routerCandidate.put("/candidates/:id", candidateControllers.edit);
routerCandidate.post("/candidates", candidateControllers.add);
routerCandidate.delete("/candidates/:id", candidateControllers.destroy);

routerCandidate.post("/picture", upload.single("picture"), (req, res) => {
  const { originalname } = req.file;

  const { filename } = req.file;

  fs.rename(
    `./public/uploads/${filename}`,
    `./public/uploads/${uuidv4()}-${originalname}`,
    (err) => {
      if (err) throw err;
      res.send("File uploaded");
    }
  );
});

module.exports = routerCandidate;
