"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tradePosts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.STRING,
      },
      cCost: {
        type: Sequelize.INTEGER,
      },
      img: {
        type: Sequelize.STRING,
      },
      nomalOrNot: {
        type: Sequelize.INTEGER,
      },
      sCost: {
        type: Sequelize.INTEGER,
      },
      state: {
        type: Sequelize.INTEGER,
      },
      likes_cnt: {
        type: Sequelize.INTEGER,
      },
      endTime: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("tradePosts");
  },
};
