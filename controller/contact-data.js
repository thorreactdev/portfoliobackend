const { db } = require("../utils/db");

const contactData = async(req,res)=>{
    const { name, email, message } = req.body;
    try {
        const sql = "INSERT INTO contactdetails (name, email, message) VALUES (?, ?, ?)";
        const [result] = await db.query(sql, [name, email, message]);
        console.log(result);
        res.json({ message: "Thanks For Connecting With Us!" });
        
    } catch (error) {
        console.error(err);
        res.status(500).send('Error saving personal information');  
    }
};

module.exports={contactData};