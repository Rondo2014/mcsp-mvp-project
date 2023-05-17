import moment from "moment";
import express from "express";
import dotenv from "dotenv";
import pg from "pg";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
app.use(express.json());

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
console.log(process.env.DATABASE_URL);

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await pool.query(`SELECT * FROM users;`);
    res.status(200).send(users.rows);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  const { fullName, email, username, password, gender } = req.body;
  const dateOfBirth = req.body["date-of-birth"];
  // const formattedDate = moment(dateOfBirth).format("YYYY-MM-DD");
  const existingUser = await pool.query(
    "SELECT * FROM users WHERE username =$1 OR email =$2",
    [username, email]
  );
  if (existingUser.rows.length > 0) {
    res.status(400).send("Username or email already exists");
    return;
  }
  try {
    const result = await pool.query(
      `INSERT INTO users (name, email, username, password, date_of_birth, gender) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [fullName, email, username, password, dateOfBirth, gender]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).send("Invalid token");
  }
  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, "super-secret-key");

    const userId = decoded.userId;

    const user = await pool.query(`SELECT * FROM users WHERE id =$1`, [userId]);
    if (user.rows.length === 0 || user.rows.length === undefined) {
      res.status(404).send("Not found");
      return;
    }
    res.setHeader("Content-Type", "application/json").send(user.rows[0]);
  } catch (err) {
    res.status(401).send("Invalid token");
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).send("Invalid token");
  }
  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, "super-secret-key");

    const userId = decoded.userId;
    const user = await pool.query(
      "DELETE FROM users WHERE id =$1 RETURNING *",
      [userId]
    );
    if (user.rows.length === 0 || user.rows.length === undefined) {
      res.status(400).send("Not found");
      return;
    }
    res.setHeader("Content-Type", "application/json").send(user.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).send("Invalid token");
    return;
  }
  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, "super-secret-key");
    const userId = decoded.userId;

    const updatedUser = req.body;
    const primary_gym = Number(req.body["primary-gym"]);
    const existingUser = await pool.query("SELECT * FROM users WHERE id =$1", [
      userId,
    ]);
    if (existingUser.rows.length === 0) {
      res.status(404).send("User not found");
      return;
    }

    const userToUpdate = existingUser.rows[0];
    const mergedUser = Object.assign({}, userToUpdate, updatedUser);
    const result = await pool.query(
      "UPDATE users SET name =$1, date_of_birth =$2, gender =$3, email =$4, trainer =$5, primary_gym =$6 WHERE id =$7 RETURNING *",
      [
        mergedUser.name,
        moment(mergedUser.date_of_birth).format("YYYY-MM-DD"),
        mergedUser.gender,
        mergedUser.email,
        mergedUser.trainer,
        primary_gym,
        userId,
      ]
    );
    res
      .setHeader("Content-Type", "application/json")
      .status(202)
      .send(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const loginRequest = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE username =$1", [
      username,
    ]);
    if (user.rows.length === 0) {
      res.status(401).send("Invalid username or password");
    }

    const isValid = bcrypt.compareSync(password, user.rows[0].password);

    if (!isValid) {
      res.status(401).send("Invalid username or password");
    }

    const secretKey = "super-secret-key";
    const userId = user.rows[0].id;
    const token = jwt.sign({ userId }, secretKey);
    res.status(202).json({ token, message: "Login Success!" });
  } catch (err) {
    next(err);
  }
};

export const passwordRequest = async (req, res, next) => {
  const { password } = req.body;
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).send("Invalid token");
  }
  const token = authHeader.substring(7);
  const decoded = jwt.verify(token, "super-secret-key");
  const userId = decoded.userId;
  try {
    const user = await pool.query(`SELECT * FROM users WHERE id =$1`, [userId]);
    if (user.rows.length === 0 || user.rows.length === undefined) {
      res.status(404).send("Not found");
      return;
    }

    const isValid = bcrypt.compareSync(password, user.rows[0].password);

    if (!isValid) {
      return res.status(401).send("Invalid username or password");
    }
    return res.status(202).json({ message: "Success!" });
  } catch (err) {
    next(err);
  }
};

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal server error");
});
