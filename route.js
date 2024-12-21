const express = require('express');
const controller = require("./controller")
const auth = require("./middleware") 

const router = express.Router();
router.post('/register', controller.register )
router.post('/login', controller.login)
router.get('/get-user/:userId', controller.getUser)
router.get('/get-users-by-name', controller.getUsersByName)
router.get('/get-allUsers', controller.getAllUsers)
router.put('/update-user/:userId', controller.updateUser)
router.put('/update-user-by-name', controller.updateUserByName)
router.patch('/updateUser/:userId', controller.updateUserByEmail)
router.delete('/delete-user/:userId', controller.deleteUser)

module.exports = router;