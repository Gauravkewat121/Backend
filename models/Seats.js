const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Seats', {
    seat_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    MT_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'MovieTheaters',
        key: 'MT_id'
      }
    },
    seat_number: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    is_booked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
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
        name: "Seats_MT_id_foreign_idx",
        using: "BTREE",
        fields: [
          { name: "MT_id" },
        ]
      },
    ]
  });
};
