const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/auth/signin', controller.signin);
router.post('/auth/signup', controller.signup);

router.get('/auth/signin', (req, res, next) => {
  res.status(200).json({
    message: 'Signin GET'
  });
});

module.exports = router;