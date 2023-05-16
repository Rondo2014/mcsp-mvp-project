import cors from "cors";
import express from "express";
import userRouter from "./users/user_routes.js";
import { hashPasswordMiddleware } from "./users/auth.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/users", hashPasswordMiddleware, userRouter);
app.use("/users/login", userRouter);
app.use("/users/password", userRouter);

export default app;
