const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");

exports.signUp = async (req, res) => {
  try {
    const { name, email, phone, password, dateOfBirth } = req.body;
    let user = await Users.findOne({ where: { email, isDeleted: false } });
    if (user) {
      return res.status(409).json({ message: "Email already Exists" });
    }
    const haspass = await bcrypt.hash(password, 10);

    user = await Users.create({
      name,
      email,
      phone,
      password: haspass,
      dateOfBirth,
    });
    return res
      .status(400)
      .json({ message: "user registered successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email }, raw: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const is_match = bcrypt.compare(password, user.password);
    console.log(is_match);
    if (!is_match) {
      return res.status(404).json({ message: "password incorrect" });
    }

    const token = generateToken({ id: user.user_id });
    console.log(user);
     const {isDeleted,deletedAt , updatedAt ,...userr} =user;
    res.status(200).json({token ,user:userr});
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.getUser = async (req, res) => {
  try {
    const id = req.user.user_id;
    const user = await Users.findOne({
      where: { user_id: id, isDeleted: false },
      attributes: { exclude: ["password", "isDeleted", "deletedAt"] },
    });
    if (!user) return res.status(409).json({ message: "user not found" });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
