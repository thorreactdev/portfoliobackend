require("dotenv").config();
const express = require("express");
const mysql2 = require("mysql2");
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use(bodyParser.json());

// Connect to database

const config = {
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
}

const db = mysql2.createConnection(config)

db.connect((err)=>{
    if(err){
        console.log("Database Not Connected" . err);
    }else{
        console.log( "Connected To Database Successfully")
    }
});

app.post("/api/contactdata" , (req,res)=>{
    const { name , email , message } = req.body;
    const sql = "INSERT INTO  contactdetails (name , email , message) VALUES(?,?,?)";
    db.query(sql,[name,email,message] , (err, result)=>{
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).send('Error saving personal information');
            return;
          }
      
          res.json({ message : "Thanks For Connnecting  With Us!"});
    });
    
});


const PORT = process.env.PORT || 4000

app.listen(PORT , ()=>{
    console.log(`Server is Running on PORT ${PORT}`);
})
    