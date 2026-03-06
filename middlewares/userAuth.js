const { Users } = require("../models");
const { verifyToken } = require('../utils/jwt')

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  let token;

  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else {
    token = authHeader;
  }
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
