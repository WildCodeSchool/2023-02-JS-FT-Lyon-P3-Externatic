// import some node modules for later
const fs = require("node:fs");
const path = require("node:path");
const cookieParser = require("cookie-parser");

// create express app

const express = require("express");

const app = express();

// use some application-level middlewares

app.use(express.json());
app.use(cookieParser());

const cors = require("cors");

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

// import and mount the API routes
const routerSendemail = require("./Routers/routerSendEmail");
const router = require("./Routers/router");
const routerUsers = require("./Routers/routerUser");
const routerApplication = require("./Routers/routerApplications");
const routerCandidate = require("./Routers/routerCandidate");
const routerJob = require("./Routers/routerJob");
const routerCompany = require("./Routers/routerCompany");
const routerJobType = require("./Routers/routerJobType");
const routerJobLocation = require("./Routers/routerJobLocation");
const routerJobCategory = require("./Routers/routerJobCategory");

app.use(router);
app.use(routerUsers);
app.use(routerApplication);
app.use(routerCandidate);
app.use(routerJob);
app.use(routerCompany);
app.use(routerJobType);
app.use(routerJobLocation);
app.use(routerJobCategory);
app.use(routerSendemail);
// serve the `backend/public` folder for public resources

app.use(express.static(path.join(__dirname, "../public")));

// serve REACT APP

const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  // serve REACT resources

  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

  // redirect all requests to the REACT index file

  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

// ready to export

module.exports = app;
