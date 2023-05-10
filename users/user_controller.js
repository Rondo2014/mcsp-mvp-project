import pg from "pg";
import moment from "moment";
import express from "express";

const pool = new pg.Pool({
  user: "jovi",
  host: "localhost",
  database: "globoGym",
  password: "123",
  port: 5432,
});

const app = express();
app.use(express.json());

app.use((err, req, res, next) => {
  res.status(500).send("Internal servor error");
});

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await pool.query(`SELECT * FROM users;`);
    res.status(200).send(users.rows);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  const { name, email, dateOfBirth, username, password, gender } = req.body;
  const formattedDate = moment(dateOfBirth).format("YYYY-MM-DD");
  try {
    const result = await pool.query(
      `INSERT INTO users (name, email, username, password, date_of_birth, gender) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, email, username, password, formattedDate, gender]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};
