import User from "../models/usermodel.js";
import jwt from "jsonwebtoken";
const authenticateToken = async (req, res, next) => {
  //   const authHeader = req.headers["authorization"];
  try {
    const token =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(401).json({
        succeeded: false,
        error: "no token available",
      });
    }
    req.user = await User.findById(
      jwt.verify(token, process.env.JWT.SECRET).userId
    );
    next();
  } catch (error) {
    res.status(401).json({
      succeeded: false,
      error: "not authorized",
    });
  }
};
export { authenticateToken };
