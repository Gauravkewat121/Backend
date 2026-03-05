'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {

    const shows = [];

    const movies = await queryInterface.sequelize.query(
      `SELECT movie_id FROM Movies`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const screens = await queryInterface.sequelize.query(
      `SELECT screen_id, theater_id FROM Screens`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const showTimes = [
      "09:00:00",
      "12:00:00",
      "15:00:00",
      "18:00:00",
      "21:00:00"
    ];

    const usedShows = new Set();

    while (shows.length < 1000) {

      const movie = faker.helpers.arrayElement(movies);
      const screen = faker.helpers.arrayElement(screens);

      const randomDate = faker.date.soon({ days: 30 });
      const time = faker.helpers.arrayElement(showTimes);

      const datePart = randomDate.toISOString().split('T')[0];
      const start_time = `${datePart} ${time}`;

      const uniqueKey = `${screen.screen_id}_${start_time}`;

      if (!usedShows.has(uniqueKey)) {

        usedShows.add(uniqueKey);

        shows.push({
          movie_id: movie.movie_id,
          theater_id: screen.theater_id,
          screen_id: screen.screen_id,
          price: faker.number.int({ min: 150, max: 500 }),
          start_time: start_time
        });

      }

    }

    await queryInterface.bulkInsert('MovieTheaters', shows);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MovieTheaters', null, {});
  }
};
