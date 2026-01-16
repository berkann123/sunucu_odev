import express from "express";
import * as userController from "../controllers/usercontroller.js";
const router = express.Router();

router.route("/register").post(userController.createuser);

export default router;
