const { Transaction, DetailTransaction, Book } = require('../../db/models');
const { Op } = require('sequelize');
const sequelize = require('../../db/models').sequelize;

module.exports = {
  checkout: async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const { payload } = req.body;
      const user = req.user.id;

      const transaction = await Transaction.create(
        {
          invoice: `T-${Math.floor(100000 + Math.random() * 900000)}`,
          date: new Date(),
          user: user
        },
        {
          transaction: t
        }
      );

      let errorBookIdNotFound = [],
        errorBookIdStock = [],
        updateStock = [];
      
      for (let i = 0; i < payload.length; i++) {

        const checkBook = await Book.findOne({
          where: {
            id: payload[i].bookId,
            user: user
          }
        });
        
        payload[i].transaction = transaction.id;
        payload[i].user = user;
        payload[i].book = checkBook.id;
        payload[i].titleBook = checkBook.title;
        payload[i].coverBook = checkBook.cover;
        payload[i].priceBook = checkBook.price;
        // payload[i].quantity = checkBook.stock;

        updateStock.push(
          {
            id: payload[i].bookId,
            stock: checkBook.stock - payload[i].quantity,
            user: user
          }
        );

        if (payload[i].quantity > checkBook.stock) {
          errorBookIdStock.push(`${payload[i].quantity} - ${checkBook.stock}`);
        }
        
        if (!checkBook) {
          errorBookIdNotFound.push(payload[i].bookId);
        }
      }
      
      if (errorBookIdStock.length !== 0) {
        return res.status(400).json({
          message: `Stock of the book is not enough, with id : ${errorBookIdStock.join(', ')} and user : ${user}`
        });
      }

      if (errorBookIdNotFound.length !== 0) {
        return res.status(400).json({
          message: `there is no book with id : ${errorBookIdNotFound.join(', ')} and user : ${user}`
        });
      }

      await Book.bulkCreate(
        updateStock,
        {
          updateOnDuplicate: ['stock']
        },
        {
          transaction: t
        }
      );

      const detailTransaction = await DetailTransaction.bulkCreate(
        payload,
        {
          transaction: t
        }
      );

      await t.commit();

      res.status(201).json({
        message: `Success checkout`,
        data: detailTransaction
      });
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
}