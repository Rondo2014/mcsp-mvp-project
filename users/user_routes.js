import express from "express";
import {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
  loginRequest,
} from "./user_controller.js";

const router = express.Router();

router.post("/login", loginRequest);
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).delete(deleteUser).patch(updateUser);

export default router;
