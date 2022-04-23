const { Op } = require('sequelize');
const { Book, Category } = require('../../db/models');

module.exports = {
  getAllBooks: async(req, res, next) => {
    try {
      const { keyword = "" } = req.query;
      let condition = {
        user: req.user.id,
      }
      console.log(keyword);

      if (keyword !== "") {
        condition = {
          ...condition,
          title: {
            [Op.like] : `%${keyword}%`
          }
        }
      }
      const books = await Book.findAll({
        where: condition,
        include: {
          model: Category,
          attributes: ['id', 'name']
        },
      });
      res.status(200).json({
        message: "Get all books!",
        data: books
      })

    } catch (err) {
      next(err);
    }
  },
};