const express = require('express');

const router = express.Router();

const controller = require('../controllers/auth_Controllers')


router.post('/signup',controller.signup)
router.post('/login',controller.login)
router.post('/logout',controller.logout)

module.exports =router;
