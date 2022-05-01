const { Op } = require('sequelize');
const { Transaction, DetailTransaction } = require('../../db/models');

module.exports = {
  getAllTransactions: async (req, res, next) => {
    try {
      const { keyword = '' }  = req.query;

      let condition = {
        user: req.user.id,
      }

      if (keyword !== "") {
        condition = {
          ...condition,
          invoice: {
            [Op.like] : `%${keyword}%`
          }
        }
      }

      const transaction = await Transaction.findAll({
        where: condition,
        include: {
          model: DetailTransaction,
          as: 'detailTransactions'
        },
      });

      res.status(200).json({
        message: 'Get all transaction!',
        data: transaction
      });
    } catch (err) {
      next(err);
    }
  },
  detailTransactions: async (req, res, next) => { 
    try {
      const { id } = req.params;

      const detailTransaction = await Transaction.findOne({
        where: { id: id },
        include: {
          model: DetailTransaction,
          as: 'detailTransactions'
        },
      });

      res.status(200).json({
        message: 'Success get detail transaction',
        data: detailTransaction
      });

    } catch (err) {
      next(err);
    }
  }
}