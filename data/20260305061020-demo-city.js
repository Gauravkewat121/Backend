'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {

    const cities = [];

    const indianStates = [
      "Gujarat",
      "Maharashtra",
      "Rajasthan",
      "Madhya Pradesh",
      "Uttar Pradesh",
      "Punjab",
      "Haryana",
      "Tamil Nadu",
      "Karnataka",
      "Kerala"
    ];

    for (let i = 0; i < 100; i++) {
      cities.push({
        name: faker.location.city(),
        state: faker.helpers.arrayElement(indianStates),
        country: "India"
      });
    }

    await queryInterface.bulkInsert('Cities', cities, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cities', null, {});
  }
};