import jwt from "jsonwebtoken";

const auth = function (req, res, next) {
  // Get Token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, autherization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, "mysecrettoken");

    req.user_id = decoded.user_id;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
export default auth;
