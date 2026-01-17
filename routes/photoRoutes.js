import express from "express";
import * as photoController from "../controllers/photoController.js";
const router = express.Router();

router.route("/").post(photoController.createPhoto);
router.route("/").get(photoController.getAllPhoto);
router.route("/:id").get(photoController.getAPhoto);
router.route("/:id").delete(photoController.deletePhoto);

export default router;
