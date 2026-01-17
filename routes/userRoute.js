import express from "express";
import * as userController from "../controllers/usercontroller.js";
import * as authMiddleware from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.route("/register").post(userController.createuser);
router.route("/login").post(userController.loginUser);
router
  .route("/dashboard")
  .get(authMiddleware.authenticateToken, userController.getDashboardPage);
router.route("/").get(userController.getAllUsers);
router.route("/:id").get(userController.getAUsers);
router
  .route("/id:/follow")
  .put(authMiddleware.authenticateToken, userController.follow);
router
  .route("/id:/unfollow")
  .put(authMiddleware.authenticateToken, userController.unfollow);

export default router;
