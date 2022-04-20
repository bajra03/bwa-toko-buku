'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Books', [
      {
        title: 'Book 1',
        user: 1,
        category: 1,
        author: 'Author 1',
        cover: '/uploads/book-01.jpg',
        publish: new Date(),
        price: 150000,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Book 2',
        user: 1,
        category: 1,
        author: 'Author 1',
        cover: '/uploads/book-02.jpg',
        publish: new Date(),
        price: 100000,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Book 3',
        user: 1,
        category: 1,
        author: 'Author 1',
        cover: '/uploads/book-03.jpg',
        publish: new Date(),
        price: 200000,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Book 4',
        user: 1,
        category: 1,
        author: 'Author 1',
        cover: '/uploads/book-04.jpg',
        publish: new Date(),
        price: 150000,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Books', null, {});
  }
};
