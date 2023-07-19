const express = require('express');
const { register, login, userInfo } = require('../controller/userController');
const { validate, userRegisterSchema, userLoginSchema } = require('../middleware/validator/userValidator');
const { userAuth } = require('../middleware/auth');

var router = express.Router();

router.post('/register', 
    validate(userRegisterSchema), 
    register
)

router.post('/login', 
  validate(userLoginSchema), 
  login
)

router.get('/me', 
  userAuth,
  userInfo
)

module.exports = { router }