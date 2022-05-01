const express = require('express');
const router = express.Router();
const { auth } = require('../../middlewares/auth');
const controller = require('./controller');

router.get('/transactions', auth, controller.getAllTransactions);
router.get('/transactions/:id', auth, controller.detailTransactions);

module.exports = router;