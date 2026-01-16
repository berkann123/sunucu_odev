import User from "../models/usermodel.js";

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

export { createuser };
