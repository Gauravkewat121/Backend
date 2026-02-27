const { Users } = require("../models");
const { verifyToken } = require('../utils/jwt')

const userAuth = async (req, res, next) => {
  let token = req.header("authorization");
  if (!token) {
    return res.status(404).json({ message: "UnAuthorized user" });
  }
  token = token.split(" ")[1];
  const varify = verifyToken(token);
  if (!varify) {
    return res.status(404).json({ message: "UnAuthorized user" });
  }
  const user = await Users.findOne({ where: { user_id: varify.id } });
  req.user = {
    user_id: user.user_id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  next();
};

module.exports = userAuth;
