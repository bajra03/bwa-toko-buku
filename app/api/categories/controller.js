const { Category } = require('../../db/models');

module.exports = {
  getAllCategories: async (req, res, next) => {
    try {
      console.log("User ID: ", req.user.id);
      // get all category based on created by the user login
      const categories = await Category.findAll({
        where: {
          user: req.user.id,
        },
        attributes: ['id', 'name'],
      });
      
      res.status(200).json({
        message: "Success get all categories",
        data: categories
      })
    } catch (err) {
      next(err);
    }
  },

  createCategory: async (req, res, next) => {
    try {
      console.log("User ID: ", req.user.id);
      const { name } = req.body;
      const categories = await Category.create(
        {
          user: req.user.id,
          name: name,
        }
      )

      res.status(201).json({
        message: "Category created!",
        data: categories
      })
    } catch (err) {
      next(err);
    }
  }
}