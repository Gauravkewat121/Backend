var DataTypes = require("sequelize").DataTypes;
var _Bookings = require("./Bookings");
var _Cities = require("./Cities");
var _Feedbacks = require("./Feedbacks");
var _Movies = require("./Movies");
var _Payments = require("./Payments");
var _Screens = require("./Screens");
var _Seats = require("./Seats");
var _SequelizeMeta = require("./SequelizeMeta");
var _Shows = require("./Shows");
var _Theaters = require("./Theaters");
var _Users = require("./Users");

function initModels(sequelize) {
  var Bookings = _Bookings(sequelize, DataTypes);
  var Cities = _Cities(sequelize, DataTypes);
  var Feedbacks = _Feedbacks(sequelize, DataTypes);
  var Movies = _Movies(sequelize, DataTypes);
  var Payments = _Payments(sequelize, DataTypes);
  var Screens = _Screens(sequelize, DataTypes);
  var Seats = _Seats(sequelize, DataTypes);
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var Shows = _Shows(sequelize, DataTypes);
  var Theaters = _Theaters(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  Payments.belongsTo(Bookings, { as: "booking", foreignKey: "booking_id"});
  Bookings.hasMany(Payments, { as: "Payments", foreignKey: "booking_id"});
  Bookings.belongsTo(Movies, { as: "movie", foreignKey: "movie_id"});
  Movies.hasMany(Bookings, { as: "Bookings", foreignKey: "movie_id"});
  Feedbacks.belongsTo(Movies, { as: "movie", foreignKey: "movie_id"});
  Movies.hasMany(Feedbacks, { as: "Feedbacks", foreignKey: "movie_id"});
  Shows.belongsTo(Movies, { as: "movie", foreignKey: "movie_id"});
  Movies.hasMany(Shows, { as: "Shows", foreignKey: "movie_id"});
  Seats.belongsTo(Screens, { as: "screen", foreignKey: "screen_id"});
  Screens.hasMany(Seats, { as: "Seats", foreignKey: "screen_id"});
  Shows.belongsTo(Screens, { as: "screen", foreignKey: "screen_id"});
  Screens.hasMany(Shows, { as: "Shows", foreignKey: "screen_id"});
  Bookings.belongsTo(Seats, { as: "seat", foreignKey: "seat_id"});
  Seats.hasMany(Bookings, { as: "Bookings", foreignKey: "seat_id"});
  Bookings.belongsTo(Shows, { as: "show", foreignKey: "show_id"});
  Shows.hasMany(Bookings, { as: "Bookings", foreignKey: "show_id"});
  Screens.belongsTo(Theaters, { as: "theater", foreignKey: "theater_id"});
  Theaters.hasMany(Screens, { as: "Screens", foreignKey: "theater_id"});
  Bookings.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(Bookings, { as: "Bookings", foreignKey: "user_id"});
  Feedbacks.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(Feedbacks, { as: "Feedbacks", foreignKey: "user_id"});
  Theaters.belongsTo(Users, { as: "owner", foreignKey: "owner_id"});
  Users.hasMany(Theaters, { as: "Theaters", foreignKey: "owner_id"});

  return {
    Bookings,
    Cities,
    Feedbacks,
    Movies,
    Payments,
    Screens,
    Seats,
    SequelizeMeta,
    Shows,
    Theaters,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
