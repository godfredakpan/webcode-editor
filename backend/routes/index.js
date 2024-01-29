const express = require('express');
const router = express.Router();
const codeController = require('../controllers/codeController');

router.post('/execute', codeController.executeCode);

module.exports = router;
