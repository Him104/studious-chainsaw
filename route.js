const express = require('express');
const controller = require("./controller")
const router = express.Router();
router.post('/register', controller.register )
router.get('/get-user/:userId', controller.getUser)
router.get('/get-users-by-name', controller.getUsersByName)

module.exports = router;