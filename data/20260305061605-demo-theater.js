'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {

    const theaters = [];

    const holidays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
      null
    ];

    for (let i = 0; i < 1000; i++) {

      const openHour = faker.number.int({ min: 8, max: 11 });
      const closeHour = faker.number.int({ min: 21, max: 23 });

      theaters.push({
        name: faker.company.name() + " Cinema",
        address: faker.location.streetAddress(),

        owner_id: faker.number.int({
          min: 1001,
          max: 2000
        }),

        opening_time: `${openHour}:00:00`,
        closing_time: `${closeHour}:00:00`,



        city_id: faker.number.int({
          min: 1,
          max: 50
        })
      });

    }

    await queryInterface.bulkInsert('Theaters', theaters, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Theaters', null, {});
  }
};