'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {

    const feedbacks = [];
       const comments = [
      "Amazing movie!",
      "Loved the storyline",
      "Average film",
      "Great acting",
      "Not worth watching",
      "Fantastic cinematography",
      "Would watch again",
      "Very entertaining",
      "Boring in the middle",
      "Highly recommended"
    ];

    const users = await queryInterface.sequelize.query(
      `SELECT user_id FROM Users`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const movies = await queryInterface.sequelize.query(
      `SELECT movie_id FROM Movies`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const usedPairs = new Set();

    while (feedbacks.length < 5000) {

      const user = faker.helpers.arrayElement(users);
      const movie = faker.helpers.arrayElement(movies);

      const key = `${user.user_id}_${movie.movie_id}`;

      if (!usedPairs.has(key)) {

        usedPairs.add(key);

        feedbacks.push({
          user_id: user.user_id,
          movie_id: movie.movie_id,
          rating: faker.number.int({ min: 1, max: 5 }),
          comment: faker.helpers.arrayElement(comments)
        });

      }

    }

    await queryInterface.bulkInsert('Feedbacks', feedbacks);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Feedbacks', null, {});
  }
};