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
    show_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Shows',
        key: 'show_id'
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
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'MovieTheaters',
    timestamps: true,
    paranoid: true,
    indexes: [
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
        name: "show_id",
        using: "BTREE",
        fields: [
          { name: "show_id" },
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
