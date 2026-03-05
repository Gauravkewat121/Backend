// seeders/20260305051745-demo-user.js
const faker = require('faker');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];
    for (let i = 0; i < 1000; i++) {
      const passwordHash = await bcrypt.hash('123456', 10);
      users.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber('##########'), // may vary by faker version
        password: passwordHash,
        role: 'vendor',
        dateOfBirth: faker.date.between('1970-01-01', '2005-12-31')
      });
    }
    await queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null,{});
  }
};