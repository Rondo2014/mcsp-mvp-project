import express from "express";
import { getAllUsers, createUser } from "./user_controller.js";

const router = express.Router();

router.get("/", getAllUsers).post("/", createUser);

export default router;
