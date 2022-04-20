const { User } = require('../../db/models');
const bcrypt = require('bcryptjs');

module.exports = {
  signin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const checkUser = await User.findOne(
        {
          where: {
            email: email,
          }
        }
      );

      // Check the email is valid
      if (checkUser) {
        const checkPassword = bcrypt.compareSync(password, checkUser.password);

        // Check password is valid
        if (checkPassword) {
          res.status(200).json({
            message: 'Login success'
          });
        } else {
          res.status(403).json({
            message: 'Invalid password'
          });
        }
        
      } else {
        res.status(403).json({
          message: 'Invalid email'
        })
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
};