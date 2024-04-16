const express =require('express');
const sendMessages =require('../controllers/message_Controller')

const protectRoute = require('../middleware/protectRoute')
const router = express.Router();

router.get('/:id',protectRoute,sendMessages.getMessages)
router.post('/send/:id',protectRoute,sendMessages.sendMessages)

module.exports= router;