const express = require('express');
const controller = require("./controller")
const auth = require("./middleware") 
const multer = require('multer')

const upload = multer()


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
router.get('/filter-by-age', controller.filterByAge)
router.post('/store', controller.store)
router.get('/group-by-city', controller.groupByCity)
router.get('/avg-age', controller.averageAge)
router.get('/filter-and-sort', controller.filerAndSort)
router.post('/upload', upload.single('file'), controller.uploadFile)

module.exports = router;