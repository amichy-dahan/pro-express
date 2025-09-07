'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UserFavorites', [
      {
        id: '55555555-5555-5555-5555-555555555555',
        userId: '921b1286-8a4b-4e6e-a611-85042f50a4cc', // demo_user
        recipeId: '22222222-2222-2222-2222-222222222222', // Pasta Napoletana
        createdAt: new Date()
      },
      {
        id: '66666666-6666-6666-6666-666666666666',
        userId: '5f19bc22-412b-47cd-96a4-3ce07ec3b793', // demo_user
        recipeId: '33333333-3333-3333-3333-333333333333', // Chocolate Cake
        createdAt: new Date()
      },
      {
        id: '77777777-7777-7777-7777-777777777777',
        userId: 'b50e592e-6629-4353-89d5-f5a3284c3499', // demo_user
        recipeId: '44444444-4444-4444-4444-444444444444', // Caesar Salad
        createdAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserFavorites', null, {});
  }
};
