require("dotenv").config();

const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const { connection } = require("./utils/db");
const contactRoute = require("./router/contact-router");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// const corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200,
//   };

// app.use(cors(corsOptions));

app.use("/api",contactRoute);

const PORT = process.env.PORT || 4000;

connection().then(()=>{
  app.listen(PORT,()=>{
    console.log(`Server is Running on PORT ${PORT}`);
  })
})
