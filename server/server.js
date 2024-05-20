const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('node:path'); 

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

//creating database connection using mysql database created and root connector
const dbConfig = {
    host: "localhost",
    user: 'root',
    password: '',
    database: 'scouts_db'
};

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

const saltRounds = 10;
const jwtSecretKey = 'your_secret_key'; // Set your secret key for JWT


// Serve static files from the public directory
app.use('public/images/gallery', express.static(path.join(__dirname, '../public/images/gallery')));

//creating a storage name and place middleware for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/gallery'));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});


const upload = multer({
    storage: storage
})

// Function to generate JWT token
const generateToken = (username, role) => {
    return jwt.sign({ username, role }, jwtSecretKey, { expiresIn: '1h' }); // Expires in 1 hour
};

// role corresponds to 0 = scout, 1 = helper, 2 = ADMIN
app.post('/signup', async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute("INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)", [username, hashedPassword, email, role]);
        connection.end();

        const token = generateToken(username, role);
        res.send({ username, role, token }); // Send token in response
    } catch (err) {
        res.status(500).send(`Couldn't register user.`);
    }
});

app.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ error: 'Username and password are required' });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute("SELECT * FROM users WHERE username = ?", [username]);
        connection.end();

        if (result.length < 1) {
            return res.status(401).send({ error: 'Invalid username or password' });
        }

        const match = await bcrypt.compare(password, result[0].password);
        if (match) {
            const token = generateToken(username, result[0].role); // Generate JWT token
            return res.status(200).json({ username, role: result[0].role, token }); // Include token in the response
        } else {
            return res.status(401).send({ error: 'Invalid username or password' });
        }
    } catch (err) {
        return res.status(500).send({ error: 'Internal server error' });
    }
});


// Submit image to gallery
app.post('/gallery', upload.single('image'), async (req, res) => {
    const { title, content, location } = req.body;
    const filePath = path.join('images/gallery', req.file.filename);
    const approvalStatus = 1; // Set initial approval status to pending

    const sql = 'INSERT INTO gallery (title, content, location, gal_img, pending) VALUES (?, ?, ?, ?, ?)';
    const values = [title, content, location, filePath, approvalStatus];

    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(sql, values);
        connection.end();

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
        const connection = await mysql.createConnection(dbConfig);
        const [results] = await connection.execute(sql);
        connection.end();

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
        const connection = await mysql.createConnection(dbConfig);
        const [results] = await connection.execute(sql);
        connection.end();

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
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(sql, values);
        connection.end();

        res.status(200).json({ message: 'Image status updated successfully' });
    } catch (error) {
        console.error('Error updating image status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete an image
app.delete('/gallery/:id', async (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM gallery WHERE gallery_id = ?';

    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(sql, [id]);
        connection.end();

        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/users', async (req, res) => {
    const sql = "SELECT * FROM users";

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [data] = await connection.execute(sql);
        connection.end();

        return res.json(data);
    } catch (err) {
        return res.json(err);
    }
});
