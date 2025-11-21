const express = require('express');
const router = express.Router();
const botController = require('../controllers/botController');
const auth = require('../middleware/auth'); // Import middleware

// Protect these routes!
router.post('/process-audio', auth, botController.processAudio);
router.get('/history', auth, botController.getChatHistory); // New Route

module.exports = router;