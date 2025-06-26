"use strict";

const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];


    // Admin
    users.push({
      email: "admin@gmail.com",
      username: "admin",
      password: await bcrypt.hash("admin", 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await queryInterface.bulkInsert("users", users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null , {});
    await queryInterface.sequelize.query(`
      SELECT setval(pg_get_serial_sequence('users', 'id'), 1, false);
    `);
  },
};
