const express = require("express");
const fs = require("fs");
const multer = require("multer");

const { v4: uuidv4 } = require("uuid");

const upload = multer({ dest: "./public/uploads/" });

const {
  hashPassword,
  verifyPassword,
  verifyToken,
  logout,
} = require("../services/auth");
const {
  getCandidateByEmailMiddleWare,
  register,
} = require("../controllers/authControllers");

const routerCandidate = express.Router();

const candidateControllers = require("../controllers/candidateControllers");

// Routes Privées
routerCandidate.post("/register", hashPassword, register);
routerCandidate.post("/login", getCandidateByEmailMiddleWare, verifyPassword);
routerCandidate.get("/logout", verifyToken, logout);
routerCandidate.get(
  "/candidate-profile",
  verifyToken,
  candidateControllers.profile
);

// Routes Publiques
routerCandidate.get("/candidates", candidateControllers.browse);
routerCandidate.get("/candidates/:id", candidateControllers.read);
routerCandidate.put("/candidates/:id", candidateControllers.edit);
routerCandidate.delete("/candidates/:id", candidateControllers.destroy);

routerCandidate.post("/monCV", upload.single("monCV"), (req, res) => {
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
  console.warn(req.file.path, req.file.originalname);
});

module.exports = routerCandidate;
