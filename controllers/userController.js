import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Photo from "../models/photoModels.js";

const createuser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ newUser: newUser_id });
  } catch (error) {
    console.log("Error", error);
    let errors2 = {};
    if (error.code === 11000) {
      errors2.email = "The email is already register";
    }

    if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((key) => {
        errors2[key] = error.errors[key].message;
      });
    }
    console.log("ERRORS 2:::", errors2);
    res.status(400).json(errors2);
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
const getDashboardPage = async (req, res) => {
  // try {
  // Dashboard'da fotoğrafları göstermek için DB'den çekmemiz lazım
  const photos = await Photo.find({ user: res.locals.user._id });
  const user = await User.findById({ _id: res.locals.user._id }).populate([
    "followings",
    "followers",
  ]);
  res.status(200).render("dashboard", {
    link: "dashboard",
    photos, // Eğer fotoğraf yoksa bile bu artık '[]' (boş dizi) olur, undefined olmaz.
  });
  // } catch (error) {
  //   console.log("dashboard hatası", error);

  //   res.status(500).render("dashboard", {
  //     link: "dashboard",
  //     photos: [],
  //     error: error.message,
  //   });
  // }
};
const getAllusers = async (req, res) => {
  try {
    const users = await Users.findById({ _id: { $ne: res.locals.user._id } });
    const photos = await Photo.find({ user: res.locals.user._id });

    res.status(200).render("users", { users, photos, link: "users" });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};
const getAuser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).render("user", { user, link: "users" });
    res.status(200).render("user", {
      user,
      photos,
      link: "users",
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};
const getAUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).render("user", { user, link: "users" });
    res.status(200).render("user", {
      user,
      photos,
      link: "users",
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};
const follow = async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $pull: { followers: res.locals.user._id } },
      { new: true }
    );
    user = await User.findByIdAndUpdate(
      { _id: res.locals.user._id },
      { $pull: { following: req.params.id } },
      { new: true }
    );
    res.status(200).json({
      succeded: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};
const unfollow = async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { followers: res.locals.user._id } },
      { new: true }
    );
    user = await User.findByIdAndUpdate(
      { _id: res.locals.user._id },
      { $push: { following: req.params.id } },
      { new: true }
    );
    res.status(200).json({
      succeded: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

export {
  createuser,
  loginUser,
  getDashboardPage,
  getAllusers,
  getAuser,
  follow,
  unfollow,
};
