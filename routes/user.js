const {Router} = require('express');
const { getUsers,addUser,updateUser } = require('../controllers/user');
const router = Router();

router.get('/getUsers',getUsers);

router.post('/addUser',addUser);

router.put('/updateUser',updateUser);

module.exports = router;