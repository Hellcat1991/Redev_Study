const express = require("express");
const router = express.Router();
const usersRoutes = require("./usersRoutes");
const usersMessage = require("./usersMessage");

router.use("/users", usersRoutes);
router.use("/api/hello", usersMessage);

module.exports = router;
