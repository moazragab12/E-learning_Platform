const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');


router.get('/me', auth, userController.getMyProfile);
router.put('/me', auth, userController.updateMyProfile);

router.route('/')
    .post(userController.createUser)
    .get(userController.getUsers)
    ;

router.route('/:id')
    .get(userController.getUserById)
    .put(auth, userController.updateUserById)
    .delete(auth, userController.deleteUserById)
    ;




module.exports = router;
