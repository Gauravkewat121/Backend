const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Screens', {
    screeen_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    theater_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Theaters',
        key: 'theater_id'
      }
    },
    screen_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_seats: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'Screens',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "screeen_id" },
        ]
      },
      {
        name: "theater_id",
        using: "BTREE",
        fields: [
          { name: "theater_id" },
        ]
      },
    ]
  });
};
