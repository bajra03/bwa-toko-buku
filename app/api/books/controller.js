const { Book } = require('../../db/models');

module.exports = {
  getAllBooks: async(req, res, next) => {
    try {
      const books = await Book.findAll({
        where: {
          user: req.user.id
        }
      });
      res.status(200).json({
        message: "Get all books!",
        data: books
      })

    } catch (err) {
      next(err);
    }
  }
};