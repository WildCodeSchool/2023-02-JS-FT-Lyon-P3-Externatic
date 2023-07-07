const express = require("express");
const multer = require("multer");

const routerUser = express.Router();
const { verifyToken } = require("../services/auth");

const uploadPicture = multer({ dest: "./public/uploads/pictures/" });

const userControllers = require("../controllers/userControllers");

routerUser.post(
  "/maPhoto",
  verifyToken,
  uploadPicture.single("maPhoto"),
  userControllers.uploadPhoto
);

routerUser.get("/users", userControllers.browse);
routerUser.get("/users/:id", userControllers.read);
routerUser.put("/users/:id", userControllers.edit);
routerUser.post("/users", userControllers.add);
routerUser.delete("/users/:id", userControllers.destroy);

module.exports = routerUser;
