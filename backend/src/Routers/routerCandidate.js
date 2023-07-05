const express = require("express");

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

// Routes Publiques
routerCandidate.get("/candidates", candidateControllers.browse);
routerCandidate.get("/candidates/:id", candidateControllers.read);
routerCandidate.put("/candidates/:id", candidateControllers.edit);
routerCandidate.delete("/candidates/:id", candidateControllers.destroy);

routerCandidate.post(
  "/monCV",
  verifyToken,
  candidateControllers.uploadCV,
  (req, res) => {
    res.send("File uploaded");
  }
);

module.exports = routerCandidate;
