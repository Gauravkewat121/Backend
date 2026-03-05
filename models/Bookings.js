const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Bookings', {
    booking_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    seat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Seats',
        key: 'seat_id'
      }
    },
    MT_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'MovieTheaters',
        key: 'MT_id'
      }
    },
    total_amount: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    booking_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('booked','wait-list','cancelled'),
      allowNull: false,
      defaultValue: "booked"
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'Bookings',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "booking_id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "seat_id",
        using: "BTREE",
        fields: [
          { name: "seat_id" },
        ]
      },
      {
        name: "MT_id",
        using: "BTREE",
        fields: [
          { name: "MT_id" },
        ]
      },
    ]
  });
};
