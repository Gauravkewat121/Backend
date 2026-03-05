'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {

    const payments = [];

    const bookings = await queryInterface.sequelize.query(
      `SELECT booking_id, total_amount, status FROM Bookings`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const methods = [
      "UPI",
      "Credit Card",
      "Debit Card",
      "Net Banking",
      "Wallet"
    ];

    for (const booking of bookings) {

      let paymentStatus;
      let transactionId = null;
      let paidAt = null;

      if (booking.status === "booked") {
        paymentStatus = "completed";
        transactionId = faker.string.alphanumeric(12).toUpperCase();
        paidAt = faker.date.recent({ days: 5 });
      }

      else if (booking.status === "cancelled") {
        paymentStatus = "failed";
      }

      else if (booking.status === "wait-list") {
        paymentStatus = "pending";
      }

      payments.push({
        booking_id: booking.booking_id,

        amount: booking.total_amount,

        payment_method: faker.helpers.arrayElement(methods),

        payment_status: paymentStatus,

        transaction_id: transactionId,

        paid_at: paidAt
      });

    }

    await queryInterface.bulkInsert('Payments', payments);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Payments', null, {});
  }
};