const express = require("express");
const routerMess = express.Router();
const UsersMessControllers = require("../controllers/usersMessControllers");

routerMess.get("/api/hello", UsersMessControllers.getMessage);

routerMess.post("/api/echo", UsersMessControllers.postMessage);

module.exports = routerMess;
