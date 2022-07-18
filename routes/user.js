const {Router} = require('express');
const { getUsers,addUser,updateUser, getUser } = require('../controllers/user');
const router = Router();

router.get('/getUsers',getUsers);

router.post('/addUser',addUser);

router.put('/updateUser',updateUser);

router.get('/getUser',getUser);

module.exports = router;