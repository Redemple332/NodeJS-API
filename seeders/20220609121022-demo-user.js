'use strict';
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const faker = require('faker');
const password = '12345678'
const hashpass = bcrypt.hashSync(password, 10);

const users = [...Array(1)].map((user) => (
  {


	firstname: faker.name.firstName(),
	lastname: faker.name.lastName(),
	address: faker.address.cityName(),
	postcode: faker.address.zipCode(),
	contact: faker.phone.phoneNumber(),
	email: "demo@gmail.com",
	username: faker.internet.userName(),
	password:  hashpass,
  createdAt: new Date(),
  updatedAt: new Date()
  }
))

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */


		await queryInterface.bulkInsert("Users", users, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
