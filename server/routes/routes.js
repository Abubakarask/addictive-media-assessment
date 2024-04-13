const express = require("express");
const { userInteractionCreate } = require("../controllers/userInteraction");
const { createUser, updateUser } = require("../controllers/user");

const router = new express.Router();

router.post("/user-interaction", userInteractionCreate);
router.post("/user/create", createUser);
router.post("/user/update", updateUser);


module.exports = router;
