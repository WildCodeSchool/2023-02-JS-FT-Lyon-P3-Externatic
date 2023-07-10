const express = require("express");
const multer = require("multer");

const uploadCV = multer({ dest: "./public/cv/" });

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
routerCandidate.get("/logout", logout);
routerCandidate.get(
  "/candidate-profile",
  verifyToken,
  candidateControllers.profile
);
routerCandidate.post(
  "/monCV",
  verifyToken,
  uploadCV.single("monCV"),
  candidateControllers.uploadCV
);

// Routes Publiques
routerCandidate.get("/candidates", candidateControllers.browse);
routerCandidate.get("/candidates/:id", candidateControllers.read);
routerCandidate.put("/candidates/:id", candidateControllers.edit);
routerCandidate.delete("/candidates", candidateControllers.destroyByLastName);

module.exports = routerCandidate;
