const express = require("express");

const {
  hashPassword,
  verifyCandidatePassword,
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
routerCandidate.post(
  "/login",
  getCandidateByEmailMiddleWare,
  verifyCandidatePassword
);
routerCandidate.get("/logoutCandidate", logout);
routerCandidate.get(
  "/candidate-profile",
  verifyToken,
  candidateControllers.profile
);
routerCandidate.post(
  "/monCV",
  verifyToken,
  candidateControllers.uploadCV,
  (req, res) => {
    res.send("File uploaded");
  }
);

// Routes Publiques
routerCandidate.get("/candidates", candidateControllers.browse);
routerCandidate.get("/candidates/:id", candidateControllers.read);
routerCandidate.put("/candidates/:id", candidateControllers.edit);
routerCandidate.delete("/candidates", candidateControllers.destroyByLastName);

module.exports = routerCandidate;
