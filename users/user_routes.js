import express from "express";
import { getAllUsers, createUser, getUser } from "./user_controller.js";

const router = express.Router();

router.get("/", getAllUsers).post("/", createUser);
router.get("/:id", getUser);
export default router;
