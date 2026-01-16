import express from "express";
import * as pageController from "../controllers/pageController.js";
import * as authMiddleware from "../middlewares/authMiddlewares.js";

const router = express.Router();

router
  .route("/")
  .get(authMiddleware.authenticateToken, pageController.getIndexPage);
router.route("/about").get(pageController.getAboutPage);
router.route("/register").get(pageController.getRegisterpage);
router.route("/login").get(pageController.getLoginpage);

export default router;
