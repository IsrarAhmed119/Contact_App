const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access denied. No token provided");
  try {
    const decoded = jwt.verify(token, "jwtPrivatekey");
    // console.log("decoded------->>", decoded);
    req.user = decoded;
    // console.log("mddlewaere------->>", req.user._id);
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
