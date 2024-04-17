const jwt = require("jsonwebtoken");
require("dotenv").config();
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(403).json({});
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);

    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({
      msg: "Problem with the auth middleware",
    });
  }
};

module.exports = { authMiddleware };