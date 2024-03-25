require("dotenv").config();
const mysql2 = require("mysql2");

const connectionURL = `mysql://${process.env.MYSQL_USER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;

const db = mysql2.createConnection(connectionURL);

const connection = async() =>{
    try {
        await db.connect(function(err,result){
            if(err){
                console.log(err);
            }else{
                console.log("Database Connected");
            }
        });
    } catch (error) {
        console.log("connection failed");
    }
};

module.exports ={
    db:db.promise() , connection
}

