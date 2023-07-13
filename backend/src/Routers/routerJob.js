const express = require("express");

const { verifyToken } = require("../services/auth");

const routerJob = express.Router();

const JobControllers = require("../controllers/jobControllers");

routerJob.get("/jobs", JobControllers.browse);
routerJob.get("/jobs/:id", JobControllers.read);
routerJob.put("/jobs/:id", verifyToken, JobControllers.edit);
routerJob.post("/jobs", verifyToken, JobControllers.add);
routerJob.delete("/jobs/:id", verifyToken, JobControllers.destroy);

module.exports = routerJob;
