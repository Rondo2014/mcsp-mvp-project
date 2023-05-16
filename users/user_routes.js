import express from "express";
import {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
  loginRequest,
  passwordRequest,
} from "./user_controller.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser).patch(updateUser);
router.route("/delete").delete(deleteUser);
router.route("/:id").get(getUser);
router.post("/login", loginRequest);
router.post("/password", passwordRequest);

export default router;
