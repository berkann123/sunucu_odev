import User from "../models/usermodel.js";
import bcrypt from "bcrypt";

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
      res.status(200).send("You are loggend in");
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

export { createuser, loginUser };
