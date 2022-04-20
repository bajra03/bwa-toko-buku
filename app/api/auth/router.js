const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/auth', function(req, res, next) {
  res.status(200).json({
    message: 'Router auth'
  });
});

module.exports = router;