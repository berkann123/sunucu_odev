import User from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createuser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.redirect("/login");
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
      const token = createToken(user.id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
      res.redirect("/users/dashboard");
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
const getDashboardPage = (req, res) => {
  res.render("dashboard", { link: "dasboard" });
};

export { createuser, loginUser, getDashboardPage };
