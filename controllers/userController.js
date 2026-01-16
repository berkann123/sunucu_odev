import User from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createuser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      succeded: true,
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("req.body", req.body);
    const user = await User.findOne({ username });
    let same = false;
    if (user) {
      same = await bcrypt.compare(password, user.password);
      console.log("same", same);
    } else {
      return res.status(401).json({
        succeded: false,
        error: "there is no such user",
      });
    }
    if (same) {
      res.status(200).json({
        user,
        token: createToken(user.id),
      });
    } else {
      res.status(401).json({
        succeded: false,
        error: "Password are not matched",
      });
    }
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error: error.message,
    });
  }
};
const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export { createuser, loginUser };
