const express = require('express');
const router = express.Router();
const { auth } = require('../../middlewares/auth');

/* GET home page. */
router.get('/categories', auth, function(req, res, next) {
  res.status(200).json({
    message: 'Get all categories'
  });
});

module.exports = router;