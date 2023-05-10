import express from "express";
import userRouter from "./users/user_routes.js";
const app = express();
app.use(express.json());

app.use("/users", userRouter);

export default app;
