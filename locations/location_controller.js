import pg from "pg";
import express from "express";

const app = express();
app.use(express.json());
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export const getAllLocations = async (req, res, next) => {
  try {
    const gyms = await pool.query("SELECT * FROM locations");
    res.status(200).send(gyms.rows);
  } catch (err) {
    next(err);
  }
};

export const getLocation = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const gym = await pool.query("SELECT * FROM locations WHERE id =$1", [id]);
    if (gym.rows.length === 0 || gym.rows.length === undefined) {
      res.status(404).send("Invalid token");
      return;
    }
    res.setHeader("Content-Type", "application/json").send(gym.rows[0]);
  } catch (err) {
    next(err);
  }
};

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal server error");
});
