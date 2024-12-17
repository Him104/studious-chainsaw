const express = require('express');
const controller = require("./controller")
const router = express.Router();
router.post('/register', controller.register )
router.get('/get-user/:userId', controller.getUser)
router.get('/get-users-by-name', controller.getUsersByName)
router.get('/get-allUsers', controller.getAllUsers)
router.put('/update-user/:userId', controller.updateUser)
router.put('/update-user-by-name', controller.updateUserByName)
module.exports = router;