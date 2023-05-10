import cors from "cors";
import express from "express";
import userRouter from "./users/user_routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/users", userRouter);

export default app;
