import express from "express";
import { getAllLocations, getLocation } from "./location_controller.js";

const router = express.Router();

router.route("/").get(getAllLocations);
router.route("/:id").get(getLocation);

export default router;
