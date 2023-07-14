const express = require("express");
const mysql = require("mysql");
// import mysql from "mysql2";
const cors = require("cors");
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "root",
    port : 3306,
    database : "loginUser"
});

app.post('/signup',async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const password = req.body.password.toString();
        const hashedPassword = await bcrypt.hash(password,salt);
        console.log("Signup=>",hashedPassword);
        // const hashedPassword = (await bcrypt.hash(req.body.password,10));
        
        const sql = "INSERT INTO login(`name`,`email`,`password`) VALUES (?)";
        const values = [
            req.body.name,
            req.body.email,
            hashedPassword
        ]
        db.query(sql,[values],(err,data)=>{
            if(err){
            return res.json("Error"  );
            }
            return res.json(data);
        });
        
       
        /*
       const password = req.body.password;
        await bcrypt.hash(password,10, async(error,hash)=>{
            const sql = "INSERT INTO login(`name`,`email`,`password`) VALUES (?,?,?)";
            const values = [
                req.body.name,
                req.body.email,
                hash
            ]
            console.log(password);
            // console.log(values,req.body.password);
            // console.log(error);
            await db.query(sql,[values],(err,data)=>{
                if(err){
                return res.json("Error");
                }
                return res.json(data);
            })

        })
        */


    }
    
    catch(error){
        throw error;
    }
});


app.post('/home',(req,res)=>{
    const sql = "INSERT INTO employee(`name`,`email`,`description`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.description
    ]
    db.query(sql,[values],(err,data)=>{
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    });
});

app.get('/data',(req,res)=>{
    const sql = 'SELECT * FROM employee';
    db.query(sql,(err,data)=>{
        if(err){
            return res.json("Error");
        }

        return res.json(data);
    });

});

/*
app.post('/login',async(req,res)=>{
    const salt = await bcrypt.genSalt(10);
    const password = req.body.password.toString();
    const hashedPassword = await bcrypt.hash(password,salt);
    
    console.log("Login=>",hashedPassword);
    const sql = "SELECT password FROM login WHERE `email` = ? ";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql,[req.body.email],async(err,data)=>{
        if(req.body.email){
            if(err){
                return res.json("Error");
            }
            if(data.length === 0){
                return res.json("Fail");
            }
            else{
                const decryptPassword = data[0].password;
                const comparePassword = await bcrypt.compare(hashedPassword,decryptPassword)
                console.log("ComparePassword=>",comparePassword);
                console.log(decryptPassword);
                return res.json(data);

            }
        }
        else{
            res.send({result:'No User Found'});
        }
    });
});
*/

//Testing the code login api
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Retrieve the user from the database
    db.query('SELECT * FROM login WHERE email = ?', email, async (error, results) => {
        if (error) {
            console.error('Error retrieving user:', error);
            res.status(500).json({ message: 'An error occurred' });
        } else {
            if (results.length === 0) {
                // User not found, return an error
                res.status(401).json({ message: 'Invalid email or password' });
            } else {

                const user = results[0];
                
                // Compare the provided password with the stored hashed password
                const checkPassword = password.toString();
                bcrypt.compare(checkPassword, user.password, (compareError, isMatch) => {
                    if (compareError) {
                        console.error('Error comparing passwords:', compareError);
                        res.status(500).json({ message: 'An error occurred' });
                    } else {
                        if (isMatch) {
                            res.status(200).send("Success");
                            console.log(results);
                        } else {
                            // Passwords do not match, return an error
                            res.status(401).json({ message: 'Invalid email or password' });
                        }
                    }
                });
            }
        }
    });
});

app.listen(8081,()=>{
    console.log("listening");
})