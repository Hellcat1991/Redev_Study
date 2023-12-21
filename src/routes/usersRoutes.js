const express = require("express");
const router = express.Router();
const UsersControllers = require('../controllers/usersControllers');



router.get("/api/users", UsersControllers.usersGet);

router.get("/api/users/:id", UsersControllers.userGetId);

router.post("/api/users", UsersControllers.userPost);

router.put("/api/users/:id", UsersControllers.userPut);

router.patch("/api/users/:id", UsersControllers.userPatch);

router.delete("/api/users/:id", UsersControllers.userDelete)



module.exports = router;