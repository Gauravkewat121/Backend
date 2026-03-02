const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Seats', {
    seat_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    seat_number: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    screen_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Screens',
        key: 'screen_id'
      }
    },
    seat_type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Seats',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "seat_id" },
        ]
      },
      {
        name: "Seats_screen_id_foreign_idx",
        using: "BTREE",
        fields: [
          { name: "screen_id" },
        ]
      },
    ]
  });
};
