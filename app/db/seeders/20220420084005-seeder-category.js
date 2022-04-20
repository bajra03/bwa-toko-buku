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
    await queryInterface.bulkInsert('Categories', [
      {
      name: 'IT',
      user: 1,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Crypto',
      user: 1,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Programming',
      user: 1,
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
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
