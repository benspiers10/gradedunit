const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const { match } = require('assert');
const jwt = require('jsonwebtoken');

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
const jwtSecretKey = 'your_secret_key'; // Set your secret key for JWT

// Function to generate JWT token
const generateToken = (username, role) => {
    return jwt.sign({ username, role }, jwtSecretKey, { expiresIn: '1h' }); // Expires in 1 hour
};

// role corresponds to 0 = scout, 1 = helper, 2 = ADMIN
app.post('/signup', (req, res)=> {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            res.status(418).send(`Couldn't hash password.`)
        } else {
            db.query("INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)", [username, hashedPassword, email, role], (err, result) => {
                if (err) {
                    res.status(418).send(`Couldn't register user.`)
                } else {
                    const token = generateToken(username, role); // Generate JWT token
                    res.send({ username, role, token }); // Send token in response
                }
            })
        }
    })
    
})

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).send({ error: 'Username and password are required' });
    }

    db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
        if (err) {
            return res.status(500).send({ error: 'Internal server error' });
        } 
        if (result.length < 1) {
            return res.status(401).send({ error: 'Invalid username or password' });
        } 
        bcrypt.compare(password, result[0].password, (err, match) => {
            if (err) {
                return res.status(500).send({ error: 'Internal server error' });
            }
            if (match) {
                const token = generateToken(username, result[0].role); // Generate JWT token
                return res.status(200).json({ username, role: result[0].role, token }); // Include token in the response
            } else {
                return res.status(401).send({ error: 'Invalid username or password' });
            }
        });
    });
});


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


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

