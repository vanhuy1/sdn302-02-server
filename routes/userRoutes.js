const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const verifyJWT = require('../middleware/verifyJWT')

router.post('/', usersController.createNewUser)

router.use(verifyJWT)

router.route('/')
    .get(usersController.getAllUsers)
// .patch(usersController.updateUser)

router.get('/:id', usersController.getUser)

router.patch('/:id', usersController.updateUser)
router.delete('/:id', usersController.deleteUser)

module.exports = router