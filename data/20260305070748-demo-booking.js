'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {

    const bookings = [];

    const users = await queryInterface.sequelize.query(
      `SELECT user_id FROM Users`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const seats = await queryInterface.sequelize.query(
      `SELECT seat_id FROM Seats`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const shows = await queryInterface.sequelize.query(
      `SELECT MT_id FROM MovieTheaters`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const statuses = ["booked", "cancelled", "wait-list"];

    const usedSeats = new Set();

    while (bookings.length < 10000) {

      const user = faker.helpers.arrayElement(users);
      const seat = faker.helpers.arrayElement(seats);
      const show = faker.helpers.arrayElement(shows);

      const key = `${show.MT_id}_${seat.seat_id}`;

      if (!usedSeats.has(key)) {

        usedSeats.add(key);

        bookings.push({
          user_id: user.user_id,
          seat_id: seat.seat_id,
          MT_id: show.MT_id,

          booking_time: faker.date.recent({ days: 600 }),

          status: faker.helpers.arrayElement(statuses),

          total_amount: faker.number.int({
            min: 250,
            max: 600
          })
        });

      }

    }

    await queryInterface.bulkInsert('Bookings', bookings);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};