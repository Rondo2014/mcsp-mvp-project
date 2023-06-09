import express from "express";
import {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
  loginRequest,
  passwordRequest,
  getUserWorkouts,
  postUserWorkout,
} from "./user_controller.js";

const router = express.Router();

router.route("/").get(getAllUsers).patch(updateUser);
router.route("/delete").delete(deleteUser);
router.route("/workouts").get(getUserWorkouts).post(postUserWorkout);
router.route("/:id").get(getUser);
router.post("/login", loginRequest);
router.post("/password", passwordRequest);
router.post("/signup", createUser);

export default router;
