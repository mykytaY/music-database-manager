//npm init
//npm install
//npm install better-sqlite3

const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');


const app = express();

app.options('*',cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
const db = new Database('chinook.db');

const multer = require('multer');
const upload = multer();

app.post('/customers',upload.none(),(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    const sql = "INSERT INTO customers(FirstName,LastName,Email) VALUES (?,?,?)";
    const statement = db.prepare(sql);
    const result = statement.run([req.body.fname,req.body.lname,req.body.email]);
    res.end();
});

app.get('/customers',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    const sql = "SELECT * FROM customers ORDER BY CustomerId DESC";
    const statement = db.prepare(sql);

    const arrOutput = [];
    for(const cust of statement.iterate())
{
    console.log(cust);
    arrOutput.push(cust);
} 

    res.end(JSON.stringify(arrOutput));
});

app.delete('/customers/:id',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    const sql = "DELETE FROM customers WHERE customerID=?";
    const statement = db.prepare(sql);
    statement.run ([req.params.id]);
    console.log('delete',req.params.id);
    res.end();
});

app.listen(8888);







