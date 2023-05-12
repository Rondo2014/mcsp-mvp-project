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
  const { fullName, email, dateOfBirth, username, password, gender } = req.body;
  const formattedDate = moment(dateOfBirth).format("YYYY-MM-DD");
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
      [fullName, email, username, password, formattedDate, gender]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  const index = Number(req.params.id);

  if (isNaN(index) || index < 0) {
    res.status(400).send("Invalid index");
    return;
  }
  try {
    const user = await pool.query(`SELECT * FROM users WHERE id =$1`, [index]);
    if (user.rows.length === 0 || user.rows.length === undefined) {
      res.status(404).send("Not found");
      return;
    }
    res.setHeader("Content-Type", "application/json").send(user.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  const index = Number(req.params.id);

  if (isNaN(index) || index < 0) {
    res.status(400).send("invalid index");
    return;
  }
  try {
    const user = await pool.query(
      "DELETE FROM users WHERE id =$1 RETURNING *",
      [index]
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
  const index = Number(req.params.id);
  const updatedUser = req.body;
  const existingUser = await pool.query(
    "SELECT * FROM users WHERE username =$1 OR email =$2",
    [updatedUser.username, updatedUser.email]
  );
  if (existingUser.rows.length > 0) {
    res.status(400).send("Username or email already exists");
    return;
  }
  console.log(updatedUser);
  if (isNaN(index) || index < 0) {
    res.status(400).send("invalid index");
    return;
  }
  const keys = [
    "name",
    "date_of_birth",
    "gender",
    "email",
    "trainer",
    "primary_gym",
  ];
  const hasKeys = Object.keys(updatedUser).some((key) => {
    return keys.includes(key);
  });
  if (!hasKeys) {
    res.status(400).send("invalid user data");
    return;
  }
  try {
    const user = await pool.query("SELECT * FROM users WHERE id =$1", [index]);
    if (user.rows.length === 0 || !user.rows[0]) {
      res.status(404).send("Not found");
    }
    const mergedUser = Object.assign({}, user.rows[0], updatedUser);
    await pool.query(
      "UPDATE users SET name =$1, date_of_birth =$2, gender =$3, email =$4, trainer =$5, primary_gym =$6 RETURNING *",
      [
        mergedUser.name,
        moment(mergedUser.date_of_birth).format("YYYY-MM-DD"),
        mergedUser.gender,
        mergedUser.email,
        mergedUser.trainer,
        mergedUser.primary_gym,
      ]
    );
    res.setHeader("Content-Type", "application/json").send(mergedUser);
  } catch (err) {
    next(err);
  }
};
export const loginRequest = async (req, res, next) => {
  console.log(req.body);
  const { username, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE username =$1", [
      username,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).send("Invalid username or password");
    }

    const isValid = bcrypt.compareSync(password, user.rows[0].password);

    if (!isValid) {
      return res.status(401).send("Invalid username or password");
    }

    const secretKey = "your-secret-key";
    const token = jwt.sign({ username: user.username }, secretKey);
    console.log(token);

    return res.json({ token });
  } catch (err) {
    next(err);
  }
};
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal server error");
});
