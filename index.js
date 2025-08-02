const express = require("express");
const cors = require("cors");
const mysql2 = require("mysql2");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
  

const conn = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
// adds the acronyms to the table
app.post('/add', (req, res) => {
    const acronyms = req.body; // should be array of { acronym, full_form }

    const values = acronyms.map(item => [item.acronym, item.full_form]);

    const sql = "INSERT INTO acronyms (acronym, full_form) VALUES ?";

    conn.query(sql, [values], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Insertion failed', error: err });
        } else {
            res.json({ message: 'Acronyms inserted successfully!', rows: result.affectedRows });
        }
    });
});

app.get('/get', (req, res) => {
    const sql = "SELECT * FROM acronyms where id=?";

    // Generate a random number between 1 and 100
    const data = Math.floor(Math.random() * 100) + 1;

    console.log(data);
    

    conn.query(sql, data,(err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Retrieval failed', error: err });
        } else {
            res.json(result);
        }
    });
});

// returns the form of the acronym with the given id
app.get('/form', (req, res) => {
    const id = req.query.id;
    console.log(id);
    
    const sql = "SELECT * FROM acronyms where id=?";
    conn.query(sql,[id],(err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Retrieval failed', error: err });
        } else {
            res.json(result);
        }
    });
});


app.listen(process.env.DB_PORT, () => {
    console.log("Server is running on port 9000");
});