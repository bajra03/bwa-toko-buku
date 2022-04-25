const { User } = require('../../db/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  signIn: async (req, res, next) => {
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
          // create token
          const token = jwt.sign({
            user: {
              id: checkUser.id,
              name: checkUser.name,
              email: checkUser.email
            }
          }, 'secret');

          res.status(200).json({
            message: 'Login success',
            token: token
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

  signUp: async (req, res, next) => {
    try {
      // make request from body
      const { name, email, password, confirmPassword } = req.body;

      const checkEmail = await User.findOne({
        where: {
          email: email,
        }
      });

      // check email is exist in database
      if (checkEmail) {
        return res.status(403).json({
          message: "Email has been registered!"
        })
      }

      // Check password are match or not
      if (password !== confirmPassword) {
        res.status(403).json({
          message: "Password are not match!"
        })
      }

      // craete user object to store to the User models
      const user = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        role: 'admin'
      });

      // console.log(user);
      // delete password from response
      delete user.dataValues.password;

      res.status(201).json({
        message: 'Register success',
        data: user
      });
    } catch (err) {
      next(err);
    }
  }
};