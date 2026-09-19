import express from 'express';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

const app = express();

app.use(express.json());

async function initDb() {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      customer TEXT NOT NULL,
      product TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

    console.log("Database initialized");
}



app.get('/', (req, res) => {
    res.send('Hello from backend');
})

app.get('/orders', async (req, res) => {
    const result = await pool.query("SELECT * FROM orders ORDER BY id");
    res.json(result.rows);
})

app.post('/orders', async (req, res) => {
    const { customer, product } = req.body;

    const result = await pool.query(
        "INSERT INTO orders(customer, product) VALUES($1, $2) RETURNING *", [customer, product]
    );
    res.status(201).json(result.rows[0]);
})

app.get('/health', (req, res) => {
    res.json({ status: "ok" });
})

app.listen(process.env.PORT || 3000, () => {
    initDb();
    console.log(`Listening on port ${process.env.PORT || 3000}`)
})