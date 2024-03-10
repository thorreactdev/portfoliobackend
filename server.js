require("dotenv").config();

const express = require("express");
const mysql2 = require("mysql2/promise");
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
// const corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200,
//   };

// app.use(cors(corsOptions));

const pool = mysql2.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

app.post("/api/contactdata", async (req, res) => {
  try {
    const connection = await pool.getConnection(); // Get a connection from the pool
    const { name, email, message } = req.body;

    const sql = "INSERT INTO contactdetails (name, email, message) VALUES (?, ?, ?)";
    const [result] = await connection.query(sql, [name, email, message]);
    console.log(result);

    await connection.release(); // Release the connection back to the pool

    res.json({ message: "Thanks For Connecting With Us!" });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving personal information');
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});