const express = require("express");

const routerCandidate = express.Router();

const candidateControllers = require("../controllers/candidateControllers");

routerCandidate.get("/candidates", candidateControllers.browse);
routerCandidate.get("/candidates/:id", candidateControllers.read);
routerCandidate.put("/candidates/:id", candidateControllers.edit);
routerCandidate.post("/register-candidate", candidateControllers.add);
routerCandidate.delete("/candidates/:id", candidateControllers.destroy);

module.exports = routerCandidate;
