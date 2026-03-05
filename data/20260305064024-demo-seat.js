'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    const seats = [];

    const screens = await queryInterface.sequelize.query(
      `SELECT screen_id, total_seats FROM Screens`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const seatTypes = [
      { type: "Platinum", price: 350 },
      { type: "Gold", price: 250 },
      { type: "Silver", price: 150 }
    ];

    const rows = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (const screen of screens) {

      const totalSeats = screen.total_seats;

      const platinumCount = Math.floor(totalSeats / 3);
      const goldCount = Math.floor(totalSeats / 3);
      const silverCount = totalSeats - (platinumCount + goldCount);

      const typeDistribution = [
        { ...seatTypes[0], count: platinumCount },
        { ...seatTypes[1], count: goldCount },
        { ...seatTypes[2], count: silverCount }
      ];

      let seatIndex = 0;

      for (const category of typeDistribution) {

        for (let i = 0; i < category.count; i++) {

          const row = rows[Math.floor(seatIndex / 10)];
          const number = (seatIndex % 10) + 1;

          seats.push({
            screen_id: screen.screen_id,
            seat_number: `${row}${number}`,
            price: category.price,
            seat_type: category.type
          });

          seatIndex++;

        }

      }

    }

    await queryInterface.bulkInsert('Seats', seats);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Seats', null, {});
  }
};