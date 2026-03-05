'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {

    const movies = [];

    const genres = [
      "Action",
      "Drama",
      "Comedy",
      "Thriller",
      "Romance",
      "Horror",
      "Sci-Fi",
      "Adventure",
      "Fantasy",
      "Mystery"
    ];

    const languages = [
      "English",
      "Hindi",
      "Gujarati",
      "Tamil",
      "Telugu",
      "Malayalam"
    ];

    for (let i = 0; i < 1000; i++) {
      movies.push({
        title: faker.lorem.words(3),
        language: faker.helpers.arrayElement(languages),
        name: faker.person.fullName(),
        genre: faker.helpers.arrayElement(genres),
        duration_time: faker.number.int({ min: 110, max: 300 }),
        release_date: faker.date.past({ years: 10 }),
        description: faker.lorem.paragraph()
      });
    }

    await queryInterface.bulkInsert('Movies', movies);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Movies', null, {});
  }
};