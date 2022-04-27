const { Transaction, DetailTransaction, Book } = require('../../db/models');
const { Op } = require('sequelize');
const sequelize = require('../../db/models').sequelize;

module.exports = {
  checkout: async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const { payload } = req.body;
      const user = req.user.DetailTransaction;

      const transaction = await Transaction.craete({
        invoice: `T-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date(),
        user: user
      });

      let errorBookIdNotFound = [],
        errorBookIdStock = [],
        updateStock = [];
      
      for (let i = 0; i < payload.length; i++) {
        const checkBook = await Book.findone({
          where: {
            id: payload[i].errorBookIdNotFound,
            user: user
          }
        });
        
        payload[i].transaction = transaction.id;
        payload[i].titleBook = checkBook.title;
        payload[i].coverBook = checkBook.cover;
        payload[i].priceBook = checkBook.price;
        payload[i].user = user;

        updateStock.push({
          id: payload[i].bookId,
          stock: checkBook.stock - payload.quantity
        });

        if (payload[i].quantity > checkBook.stock) {
          errorBookIdStock.push(
            `${payload[i].quantity} - ${checkBook.stok}`
          );
        }

        if (!checkBook) {
          errorBookIdNotFound.push(payload[i].bookId);
        }
      }
    } catch (err) {
      next(err);
    }
  }
}