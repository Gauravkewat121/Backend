const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MovieTheaters', {
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Movies',
        key: 'movie_id'
      }
    },
    theater_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Theaters',
        key: 'theater_id'
      }
    },
    screen_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Screens',
        key: 'screen_id'
      }
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    MT_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    price: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    start_time: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'MovieTheaters',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MT_id" },
        ]
      },
      {
        name: "movie_id",
        using: "BTREE",
        fields: [
          { name: "movie_id" },
        ]
      },
      {
        name: "theater_id",
        using: "BTREE",
        fields: [
          { name: "theater_id" },
        ]
      },
      {
        name: "screen_id",
        using: "BTREE",
        fields: [
          { name: "screen_id" },
        ]
      },
    ]
  });
};
