const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const auth = require('../middleware/auth'); // <--- Import this

// Add 'auth' before the controller to protect it
router.get('/stats', auth, dashboardController.getStats);

module.exports = router;