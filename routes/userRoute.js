import express from "express";
import * as userController from "../controllers/usercontroller.js";
const router = express.Router();

router.route("/register").post(userController.createuser);
router.route("/login").post(userController.loginUser);

export default router;
