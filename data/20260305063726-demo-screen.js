'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {

    const screens = [];

    const screenTypes = [
      "2D",
      "3D",
      "IMAX",
      "4DX",
      "Dolby Atmos"
    ];

    const totalTheaters = 2000;

    for (let theaterId = 1001; theaterId <= totalTheaters; theaterId++) {

      const screenCount = faker.number.int({
        min: 3,
        max: 5
      });

      for (let i = 1; i <= screenCount; i++) {

        screens.push({
          screen_no: i,
          total_seats: faker.number.int({
            min: 80,
            max: 150
          }),
          theater_id: theaterId,
          screen_type: faker.helpers.arrayElement(screenTypes)
        });

      }

    }

    await queryInterface.bulkInsert('Screens', screens, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Screens', null, {});
  }
};