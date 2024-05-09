const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    connectLimit : 10,
    host: "localhost",
    user: 'root',
    password: '',
    database: 'scouts_db'

})

const saltRounds = 10;

app.post('/signup', (req, res)=> {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            res.status(418).send(`Couldn't hash password.`)
        } else {
            db.query("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", [username, hashedPassword, email], (err, result) => {
                if (err) {
                    res.status(418).send(`Couldn't register user.`)
                } else {
                    res.send({username: username})
                }
            })
        }
    })
})


app.get('/', (re,res)=> {
    return res.json("From Backend side");
})

app.get('/users', (req, res)=> {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(8081, ()=> {
    console.log("server is listening to port 8081");
})