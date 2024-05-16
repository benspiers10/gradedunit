//created const to grab all packages
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const { match } = require('assert');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('node:path'); 

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

//creating database connection using mysql database created and root connector
const db = mysql.createConnection({
    connectLimit : 10,
    host: "localhost",
    user: 'root',
    password: '',
    database: 'scouts_db'

})

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

// app.get('/', (re,res)=> {
//     return res.json("From Backend side");
// })


const saltRounds = 10;
const jwtSecretKey = 'your_secret_key'; // Set your secret key for JWT

//creating a storage name and place middleware for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/images/gallery')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

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

// Submit image to gallery
app.post('/gallery', upload.single('image'), async (req, res) => {
    const { title, content, location } = req.body;
    const filePath = req.file.path;
    const approvalStatus = 1; // Set initial approval status to pending

    const sql = 'INSERT INTO gallery (title, content, location, gal_img, pending) VALUES (?, ?, ?, ?, ?)';
    const values = [title, content, location, filePath, approvalStatus];

    try {
        await db.query(sql, values);
        res.status(201).json({ message: 'Image submitted for approval' });
    } catch (error) {
        console.error('Error submitting image:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get pending images for approval
app.get('/gallery/pending', async (req, res) => {
    const sql = 'SELECT * FROM gallery WHERE pending = 1';

    try {
        const results = await db.query(sql);
        console.log("Pending Images Results:", results); // Log the results
        const images = results.map(row => ({
            gallery_id: row.gallery_id,
            title: row.title,
            content: row.content,
            location: row.location,
            gal_img: row.gal_img,
            pending: row.pending
        }));
        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching pending images:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Get approved images
app.get('/gallery/approved', async (req, res) => {
    const sql = 'SELECT * FROM gallery WHERE pending = 0';

    try {
        const results = await db.query(sql);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching approved images:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Approve or reject image
app.patch('/gallery/:id', async (req, res) => {
    const { id } = req.params;
    const { approvalStatus } = req.body;

    const sql = 'UPDATE gallery SET pending = ? WHERE gallery_id = ?';
    const values = [approvalStatus, id];

    try {
        await db.query(sql, values);
        res.status(200).json({ message: 'Image status updated successfully' });
    } catch (error) {
        console.error('Error updating image status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/users', (req, res)=> {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
    })
})

