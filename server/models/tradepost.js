"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tradePost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.tradePost.belongsTo(models.user, { foreignKey: "user_Id" });
      models.tradePost.hasMany(models.like, { foreignKey: "tradePost_Id" });
      models.tradePost.hasMany(models.suggestion, {
        foreignKey: "tradePost_Id",
      });
      models.tradePost.hasMany(models.chat, { foreignKey: "tradePost_Id" });
    }
  }
  tradePost.init(
    {
      user_Id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      cCost: DataTypes.INTEGER,
      img: DataTypes.STRING,
      nomalOrNot: DataTypes.INTEGER,
      sCost: DataTypes.INTEGER,
      state: DataTypes.INTEGER,
      likes_cnt: { defaultValue: 0, type: DataTypes.INTEGER },
      endTime: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "tradePost",
    }
  );
  return tradePost;
};
