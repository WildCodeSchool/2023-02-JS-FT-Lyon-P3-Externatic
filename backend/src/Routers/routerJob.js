const express = require("express");

const routerJob = express.Router();

const JobControllers = require("../controllers/jobControllers");

routerJob.get("/jobs", JobControllers.browse);
routerJob.get("/jobs/:id", JobControllers.read);
routerJob.put("/jobs/:id", JobControllers.edit);
routerJob.post("/jobs", JobControllers.add);
routerJob.delete("/jobs/:id", JobControllers.destroy);

module.exports = routerJob;
