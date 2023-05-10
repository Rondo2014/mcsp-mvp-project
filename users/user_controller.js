import moment from "moment";
import express from "express";
import dotenv from "dotenv";
import pg from "pg";

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
  console.log(req.body);
  const { fullName, email, dateOfBirth, username, password, gender } = req.body;
  const formattedDate = moment(dateOfBirth).format("YYYY-MM-DD");
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

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal servor error");
});

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
