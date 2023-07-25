const express = require("express");
const multer = require("multer");

// File type validation for multer
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF files are allowed."));
  }
};

// File size validation for multer
const maxSize = 5 * 1024 * 1024; // 5MB

const upload = multer({
  dest: "./public/cv/",
  limits: {
    fileSize: maxSize,
  },
  fileFilter,
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
  upload.single("monCV"),
  candidateControllers.uploadCV
);
routerCandidate.put(
  "/candidates/:id",
  validateCandidateUpdate,
  verifyToken,
  candidateControllers.edit
);
routerCandidate.delete(
  "/candidates/:id",
  verifyToken,
  candidateControllers.destroy
);

// Routes Publiques
routerCandidate.get("/candidates", candidateControllers.browse);
routerCandidate.get("/candidates/:id", candidateControllers.read);

module.exports = routerCandidate;
