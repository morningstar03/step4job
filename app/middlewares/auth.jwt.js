const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const auth = req.headers.cookie;
  if (!auth) {
    return res.status(403).json({ title: "error", msg: "token expired" });
  }
  const token = auth.split("=")[1];
  try {
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);
    req.id = decoded.id;
    next();
  } catch (error) {
    res.status(500).json({ title: "error", msg: "invalid token" });
  }
};
