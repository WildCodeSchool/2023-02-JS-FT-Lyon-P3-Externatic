const express = require("express");
const multer = require("multer");

const uploadCV = multer({
  dest: "./public/cv/",
  limits: { fileSize: 5000000000000 },
});

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

const {
  validateCandidate,
  validateCandidateUpdate,
} = require("../services/validator");

const routerCandidate = express.Router();

const candidateControllers = require("../controllers/candidateControllers");

// Routes Privées
routerCandidate.post(
  "/register-candidate",
  validateCandidate,
  hashPassword,
  register
);
routerCandidate.post(
  "/login-candidate",
  getCandidateByEmailMiddleWare,
  verifyCandidatePassword
);
routerCandidate.get("/logout-candidate", logout);
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
routerCandidate.put(
  "/candidates/:id",
  validateCandidateUpdate,
  candidateControllers.edit
);
routerCandidate.delete("/candidates", candidateControllers.destroyByLastName);

module.exports = routerCandidate;
