const { Cities } = require("../models");

exports.add_City = async (req, res) => {
  try {
    if (req.user.role != "admin") {

      res.status(404).json({ message: "UnAuthorized " });
    }
    else {
      const city = await Cities.create(req.body);
      res.status(200).json({city, message: "added successfully" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.getAll_City = async (req, res) => {
  try {
    const city = await Cities.findAll({
      where: { isDeleted: false },
      raw: true,
      attributes: { exclude: ["isDeleted", "deletedAt",] },
    });
    res.status(200).json(city);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
