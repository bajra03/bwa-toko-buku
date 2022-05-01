const express = require('express');
const { signIn, signUp } = require('./controller');
const router = express.Router();

router.post('/auth/signin', signIn);
router.post('/auth/signup', signUp);

router.get('/auth/signin', (req, res, next) => {
  res.status(200).json({
    message: 'Signin GET'
  });
});

module.exports = router;