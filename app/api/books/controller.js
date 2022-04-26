const { Op } = require('sequelize');
const { Book, Category } = require('../../db/models');

module.exports = {
  getAllBooks: async(req, res, next) => {
    try {
      const { keyword = "", category = "" } = req.query;
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

      if (category !== "") {
        condition = {
          ...condition,
          category: category
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

  createBooks: async (req, res, next) => {
    try {
      let user = req.user.id;
      const {
        title,
        category,
        author,
        cover,
        publish,
        price,
        stock
      } = req.body;

      const checkCategory = await Category.findOne({
        where: {
          id: category,
          user: user
        }
      });

      if (!checkCategory) {
        return res.status(404).json({
          message: "Category not found"
        });
      }

      const books = await Book.create({
        title,
        category,
        author,
        cover,
        publish,
        price,
        stock,
        user: user
      });

      res.status(201).json({
        message: "Book has been created!",
        data: books
      });
    } catch (err) {
      next(err);
    }
  },

  updateBooks: async (req, res, next) => {
    try {
      let user = req.user.id;
      const { id } = req.params;
      const {
        title,
        category,
        author,
        cover,
        publish,
        price,
        stock
      } = req.body;

      const checkCategory = await Category.findOne({
        where: {
          id: category,
          user: user
        }
      });

      if (!checkCategory) {
        return res.status(404).json({
          message: "Category not found"
        });
      }

      const checkBook = await Book.findOne({
        where: {
          id: id
        }
      });

      if (!checkBook) {
        res.status(404).json({
          message: "Book now found"
        });
      }


      const books = await checkBook.update({
        title,
        category,
        author,
        cover,
        publish,
        price,
        stock,
        user: user
      });

      res.status(200).json({
        message: "Book has been updated!",
        data: books
      });
    } catch (err) {
      next(err);
    }
  },

  deleteBooks: async (req, res, next) => {
    try {
      const { id } = req.params;
      let user = req.user.id;

      const checkBook = await Book.findOne({
        where: {
          id: id,
          user: user
        }
      });

      if (!checkBook) {
        return res.status(404).json({
          message: "ID Book not found!"
        });
      }

      const book = await checkBook.destroy();

      res.status(200).json({
        message: "Book has been deleted",
        data: book
      })
    } catch (err) {
      next(err);
    }
  }
};