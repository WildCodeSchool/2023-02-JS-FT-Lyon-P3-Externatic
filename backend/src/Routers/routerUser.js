const express = require("express");
const multer = require("multer");

const routerUser = express.Router();
const { verifyToken } = require("../services/auth");

const uploadPicture = multer({
  dest: "./public/picture/",
  limits: { fileSize: 5000000000000 }, // limit file size to 5000000000000bytes
});

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
