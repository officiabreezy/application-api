const express = require('express');
const {AdminSignup, adminLogin, findAllUsers, noUsers} = require('../controller/adminController');
const {isAuthenticated} = require('../middleware/jwt');

const router = express.Router();

router.post('/signup', AdminSignup);
router.post('/login', adminLogin);
router.get('/finduser', isAuthenticated, findAllUsers);
router.get('/allusers', isAuthenticated, noUsers);


module.exports = router;
