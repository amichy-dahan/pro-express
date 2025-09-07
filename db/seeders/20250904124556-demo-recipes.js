'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Recipes', [
      {
        id: '22222222-2222-2222-2222-222222222222',
        title: 'Pasta Napoletana',
        description: 'Classic Italian pasta with tomato sauce',
        ingredients: JSON.stringify(['Pasta', 'Tomatoes', 'Garlic', 'Olive oil', 'Basil']),
        instructions: JSON.stringify(['Cook pasta', 'Prepare sauce', 'Mix together']),
        cookingTime: 25,
        servings: 2,
        difficulty: 'easy',
        imageUrl: 'pasta.jpg',
        isPublic: true,
        userId: '5f19bc22-412b-47cd-96a4-3ce07ec3b793', // UUID של demo_user
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '33333333-3333-3333-3333-333333333333',
        title: 'Chocolate Cake',
        description: 'Rich and moist chocolate cake',
        ingredients: JSON.stringify(['Flour', 'Cocoa', 'Sugar', 'Eggs', 'Butter']),
        instructions: JSON.stringify(['Mix ingredients', 'Bake at 180°C for 40 min']),
        cookingTime: 40,
        servings: 8,
        difficulty: 'medium',
        imageUrl: 'cake.jpg',
        isPublic: true,
        userId: '921b1286-8a4b-4e6e-a611-85042f50a4cc',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '44444444-4444-4444-4444-444444444444',
        title: 'Caesar Salad',
        description: 'Fresh salad with Caesar dressing',
        ingredients: JSON.stringify(['Lettuce', 'Croutons', 'Parmesan', 'Caesar dressing']),
        instructions: JSON.stringify(['Chop lettuce', 'Add croutons and cheese', 'Toss with dressing']),
        cookingTime: 10,
        servings: 1,
        difficulty: 'easy',
        imageUrl: 'salad.jpg',
        isPublic: true,
        userId: '921b1286-8a4b-4e6e-a611-85042f50a4cc',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Recipes', null, {});
  }
};
