// Import required modules
const express = require('express'); // Express framework for building web applications
const mysql = require('mysql2/promise'); // MySQL client for Node.js with support for promises
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing (CORS)
const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies
const bcrypt = require('bcrypt'); // Library to hash passwords
const jwt = require('jsonwebtoken'); // Library to handle JSON Web Tokens (JWT) for authentication
const multer = require('multer'); // Middleware to handle file uploads
const path = require('node:path'); // Node.js module to work with file and directory paths

// Initialize the Express application
const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({extended: false})); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for all routes

// Database connection configuration
const dbConfig = {
    host: "localhost", // Hostname of the MySQL server
    user: 'root', // MySQL username
    password: '', // MySQL password
    database: 'scouts_db' // Name of the MySQL database
};

// Set the port for the Express server
const PORT = process.env.PORT || 8081;

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

// Configuration for bcrypt salt rounds
const saltRounds = 10;

// Secret key for JWT (JSON Web Token)
const jwtSecretKey = 'your_secret_key'; // leaving it as this just now for ease of use, for future i will be making one 


// Serve static files from the public directory
app.use('/images/gallery', express.static(path.join(__dirname, '../public/images/gallery')));
app.use('/images/badges', express.static(path.join(__dirname, '../public/images/badges')));
app.use('/images/events', express.static(path.join(__dirname, '../public/images/events')));
app.use('/images/profileimg', express.static(path.join(__dirname, '../public/images/profileimg')));

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'profileImage') {
            cb(null, path.join(__dirname, '../public/images/profileimg'));
        } else if (file.fieldname === 'eventImage') { // Changed from 'events' to 'eventImage'
            cb(null, path.join(__dirname, '../public/images/events'));
        } else {
            cb(null, path.join(__dirname, '../public/images/gallery'));
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

// Multer upload configuration
const upload = multer({
    storage: storage
});

// Function to generate JWT token
const generateToken = (username, role) => {
    return jwt.sign({ username, role }, jwtSecretKey, { expiresIn: '15mins' }); // Expires in 15 minutes
};


// Route to handle user signup
app.post('/signup', async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        // Hash the user's password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Establish a connection to the database
        const connection = await mysql.createConnection(dbConfig);

        // Insert user details into the 'users' table
        const [result] = await connection.execute("INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)", [username, hashedPassword, email, role]);
        
        // Retrieve the user_id of the newly created user
        const user_id = result.insertId;

        connection.end();

        // Generate a token for the user
        const token = generateToken(username, role);
        
        // Send response with username, role, token, and user_id
        res.send({ username, role, token, user_id });
    } catch (err) {
        // Handle error if user registration fails
        res.status(500).send(`Couldn't register user.`);
    }
});

// Handle user sign-in
app.post('/signin', async (req, res) => {
    const { username, password } = req.body; // Extract username and password from request body

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).send({ error: 'Username and password are required' }); // Send 400 status with error message if not provided
    }

    try {
        // Establish database connection
        const connection = await mysql.createConnection(dbConfig);

        // Query user data based on username
        const [result] = await connection.execute("SELECT * FROM users WHERE username = ?", [username]);

        // Close database connection
        connection.end();

        // If user not found, send 401 status with error message
        if (result.length < 1) {
            return res.status(401).send({ error: 'Invalid username or password' });
        }

        // Compare hashed password with provided password using bcrypt
        const match = await bcrypt.compare(password, result[0].password);

        // If passwords match, generate JWT token
        if (match) {
            const token = generateToken(username, result[0].role); // Generate JWT token
            // Send JSON response with user data and token
            return res.status(200).json({ 
                username, 
                role: result[0].role, 
                user_id: result[0].user_id, // Include user_id in the response
                token
            }); 
        } else {
            // If passwords don't match, send 401 status with error message
            return res.status(401).send({ error: 'Invalid username or password' });
        }
    } catch (err) {
        // If any error occurs during the process, send 500 status with error message
        return res.status(500).send({ error: 'Internal server error' });
    }
});


// Handle image submission to the gallery
app.post('/gallery', upload.single('image'), async (req, res) => {
    const { title, content, location, posted_by } = req.body; // Extract necessary data from request body
    const filePath = path.join('images/gallery', req.file.filename); // Construct file path for the uploaded image
    const approvalStatus = 1; // Set initial approval status to pending

    // SQL query to insert image details into the gallery table
    const sql = 'INSERT INTO gallery (title, content, location, posted_by, gal_img, pending) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [title, content, location, posted_by, filePath, approvalStatus]; // Values to be inserted into the query

    try {
        // Establish database connection
        const connection = await mysql.createConnection(dbConfig);
        // Execute the SQL query with the provided values
        await connection.execute(sql, values);
        // Close the database connection
        connection.end();

        // Send successful response with status 201 and a message
        res.status(201).json({ message: 'Image submitted for approval' });
    } catch (error) {
        // If an error occurs during the process, log the error and send a 500 status response with an error message
        console.error('Error submitting image:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Retrieve pending images awaiting approval
app.get('/gallery/pending', async (req, res) => {
    const sql = 'SELECT * FROM gallery WHERE pending = 1'; // SQL query to fetch pending images

    try {
        // Establish database connection
        const connection = await mysql.createConnection(dbConfig);
        // Execute the SQL query
        const [results] = await connection.execute(sql);
        // Close the database connection
        connection.end();

        // Map the query results to a more structured format
        const images = results.map(row => ({
            gallery_id: row.gallery_id,
            title: row.title,
            content: row.content,
            location: row.location,
            gal_img: row.gal_img,
            pending: row.pending
        }));
        
        // Send the mapped images data in the response with status 200
        res.status(200).json(images);
    } catch (error) {
        // If an error occurs during the process, log the error and send a 500 status response with an error message
        console.error('Error fetching pending images:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Retrieve approved images
app.get('/gallery/approved', async (req, res) => {
    const sql = 'SELECT * FROM gallery WHERE pending = 0'; // SQL query to fetch approved images

    try {
        // Establish database connection
        const connection = await mysql.createConnection(dbConfig);
        // Execute the SQL query
        const [results] = await connection.execute(sql);
        // Close the database connection
        connection.end();

        // Send the query results in the response with status 200
        res.status(200).json(results);
    } catch (error) {
        // If an error occurs during the process, log the error and send a 500 status response with an error message
        console.error('Error fetching approved images:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Update image approval status
app.patch('/gallery/:id', async (req, res) => {
    const { id } = req.params; // Extract the image ID from the request parameters
    const { approvalStatus } = req.body; // Extract the approval status from the request body

    const sql = 'UPDATE gallery SET pending = ? WHERE gallery_id = ?'; // SQL query to update the approval status
    const values = [approvalStatus, id]; // Values to be updated

    try {
        // Establish database connection
        const connection = await mysql.createConnection(dbConfig);
        // Execute the SQL query to update the approval status
        await connection.execute(sql, values);
        // Close the database connection
        connection.end();

        // Send a success message in the response with status 200
        res.status(200).json({ message: 'Image status updated successfully' });
    } catch (error) {
        // If an error occurs during the process, log the error and send a 500 status response with an error message
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

// Fetch badges from the database
app.get('/badges', async (req, res) => {
    const sql = 'SELECT * FROM badges';

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [results] = await connection.execute(sql);
        connection.end();

        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching badges:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Submit event to events page  
app.post('/events', upload.single('eventImage'), async (req, res) => {
    const { title, content, location, date } = req.body; // Include date in the destructured body
    const filePath = path.join('images/events', req.file.filename);

    const sql = 'INSERT INTO events (title, content, location, eve_img, date) VALUES (?, ?, ?, ?, ?)'; // Include date in the SQL statement
    const values = [title, content, location, filePath, date]; // Include date in the values array

    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(sql, values);
        connection.end();

        res.status(201).json({ message: 'Event Submitted' });
    } catch (error) {
        console.error('Error submitting:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Get all events
app.get('/events', async (req, res) => {
    const sql = 'SELECT * FROM events'; // SQL query to select all events from the database

    try {
        const connection = await mysql.createConnection(dbConfig); // Establish database connection
        const [results] = await connection.execute(sql); // Execute SQL query to fetch events
        connection.end(); // Close database connection

        // Send events data in the response with status 200
        res.status(200).json(results);
    } catch (error) {
        // If an error occurs during the process, log the error and send a 500 status response with an error message
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get event by ID
app.get('/events/:id', async (req, res) => {
    const { id } = req.params; // Extract the event ID from the request parameters
    const sql = 'SELECT * FROM events WHERE event_id = ?'; // SQL query to select event by ID

    try {
        const connection = await mysql.createConnection(dbConfig); // Establish database connection
        const [results] = await connection.execute(sql, [id]); // Execute SQL query to fetch event by ID
        connection.end(); // Close database connection

        if (results.length > 0) {
            res.status(200).json(results[0]); // If event found, send event data in the response with status 200
        } else {
            res.status(404).json({ error: 'Event not found' }); // If event not found, send error message with status 404
        }
    } catch (error) {
        // If an error occurs during the process, log the error and send a 500 status response with an error message
        console.error('Error fetching event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Fetch all users with their training status
app.get('/users', async (req, res) => {
    const sql = `
        SELECT user_id AS id, username, email, role, img_path, training_status
        FROM users
    `;

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [results] = await connection.execute(sql);
        connection.end();

        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Delete a user by ID
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute("DELETE FROM users WHERE user_id = ?", [id]);
        connection.end();

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update user profile and contact information
app.put('/users/:username', upload.single('profileImage'), async (req, res) => {
    const { username } = req.params; // Extract username from request parameters
    const { email, firstname, surname, address, phone } = req.body; // Extract user profile data from request body
    let profileImagePath = null; // Initialize profile image path variable

    try {
        // Establish database connection
        const connection = await mysql.createConnection(dbConfig);

        // Fetch user ID and existing profile image path based on the username
        const [userResult] = await connection.execute("SELECT user_id, img_path FROM users WHERE username = ?", [username]);
        if (userResult.length === 0) {
            throw new Error('User not found');
        }
        const user = userResult[0];
        profileImagePath = user.img_path; // Keep the existing image path

        // If a new file is uploaded, update the profile image path
        if (req.file) {
            profileImagePath = path.join('images/profileimg', req.file.filename);
        }

        // Update the user's profile in the database
        const sql = "UPDATE users SET email = ?, img_path = ? WHERE username = ?";
        const values = [email, profileImagePath, username];
        await connection.execute(sql, values);

        // Check if contact information exists
        const [contactInfoResult] = await connection.execute("SELECT * FROM contact_information WHERE user_fk = ?", [user.user_id]);
        if (contactInfoResult.length > 0) {
            // Update existing contact information
            const updateContactInfoSql = "UPDATE contact_information SET firstname = ?, surname = ?, address = ?, phone = ? WHERE user_fk = ?";
            const updateContactInfoValues = [firstname, surname, address, phone, user.user_id];
            await connection.execute(updateContactInfoSql, updateContactInfoValues);
        } else {
            // Insert new contact information
            const insertContactInfoSql = "INSERT INTO contact_information (user_fk, firstname, surname, address, phone) VALUES (?, ?, ?, ?, ?)";
            const insertContactInfoValues = [user.user_id, firstname, surname, address, phone];
            await connection.execute(insertContactInfoSql, insertContactInfoValues);
        }

        // Close the database connection
        connection.end();

        // Send a success response
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        // If an error occurs, log the error and send a 500 status response with an error message
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//full profile account, with contactinformation passed through for view
app.get('/users/:username', async (req, res) => {
    const { username } = req.params;

    try {
        console.log('Fetching profile for username:', username);

        const connection = await mysql.createConnection(dbConfig);

        // Fetch user profile from the users table
        console.log('Executing query to fetch user profile');
        const [userResult] = await connection.execute("SELECT * FROM users WHERE username = ?", [username]);
        console.log('User query result:', userResult);
        if (userResult.length === 0) {
            console.error('User not found for username:', username);
            throw new Error('User not found');
        }
        const user = userResult[0];

        // Fetch contact information from the contact_information table
        console.log('Executing query to fetch contact information');
        const [contactInfoResult] = await connection.execute("SELECT * FROM contact_information WHERE user_fk = ?", [user.user_id]);
        console.log('Contact information query result:', contactInfoResult);
        const contactInfo = contactInfoResult.length > 0 ? contactInfoResult[0] : {};

        connection.end();
        console.log('Database connection closed');

        // Combine user and contact information
        const profile = {
            ...user,
            firstname: contactInfo.firstname || '',
            surname: contactInfo.surname || '',
            address: contactInfo.address || '',
            phone: contactInfo.phone || ''
        };

        console.log('Combined Profile:', profile);

        res.status(200).json(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all availability
app.get('/availability', async (req, res) => {
    const sql = 'SELECT ha.availability_id, ha.helper_id, GROUP_CONCAT(ha.available_day) as available_days, u.username FROM helper_availability ha JOIN users u ON ha.helper_id = u.user_id GROUP BY ha.helper_id';

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [results] = await connection.execute(sql);
        connection.end();

        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching availability:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Get availability by helper ID
app.get('/availability/:helper_id', async (req, res) => {
    const { helper_id } = req.params;
    const sql = 'SELECT * FROM helper_availability WHERE helper_id = ?';

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [results] = await connection.execute(sql, [helper_id]);
        connection.end();

        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching availability:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add availability for a helper
app.post('/availability', async (req, res) => {
    const { helper_id, available_days } = req.body; // Extract helper ID and available days from request body

    // Check if the request body contains valid data
    if (!helper_id || !Array.isArray(available_days) || available_days.length === 0) {
        return res.status(400).json({ error: 'Invalid input data.' }); // Send 400 error response for invalid data
    }

    const sql = 'INSERT INTO helper_availability (helper_id, available_day) VALUES (?, ?)'; // SQL query to insert availability data
    
    try {
        const connection = await mysql.createConnection(dbConfig); // Establish database connection
        // Loop through available days and insert them into the database
        for (const day of available_days) {
            await connection.execute(sql, [helper_id, day]);
        }
        connection.end(); // Close database connection

        // Send success response with status 201
        res.status(201).json({ message: 'Availability added successfully' });
    } catch (error) {
        // If an error occurs, log the error and send a 500 status response with an error message
        console.error('Error adding availability:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Delete availability by ID
app.delete('/availability/:id', async (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM helper_availability WHERE availability_id = ?';

    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(sql, [id]);
        connection.end();

        res.status(200).json({ message: 'Availability deleted successfully' });
    } catch (error) {
        console.error('Error deleting availability:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Submit helper registration request
app.post('/helper/register', async (req, res) => {
    const { user_id } = req.body;

    try {
        const connection = await mysql.createConnection(dbConfig);
        
        // Check if the user already exists
        const [existingUser] = await connection.execute('SELECT * FROM users WHERE user_id = ?', [user_id]);

        if (existingUser.length === 0) {
            // If the user doesn't exist, you may want to handle this scenario based on your application's requirements
            return res.status(404).json({ error: 'User not found' });
        }

        // Now, submit the helper registration request
        await connection.execute('INSERT INTO helper_registration_requests (user_id) VALUES (?)', [user_id]);

        connection.end();

        res.status(201).json({ message: 'Helper registration request submitted successfully' });
    } catch (error) {
        console.error('Error submitting helper registration request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get helper registration requests with user information
app.get('/helper/register/requests', async (req, res) => {
    const sql = 'SELECT hrr.id, u.username, u.email, hrr.status FROM helper_registration_requests hrr JOIN users u ON hrr.user_id = u.user_id';

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [results] = await connection.execute(sql);
        connection.end();

        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching helper registration requests:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update helper registration status
app.put('/helper/register/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const connection = await mysql.createConnection(dbConfig);

        // Update helper registration status
        await connection.execute('UPDATE helper_registration_requests SET status = ? WHERE id = ?', [status, id]);

        connection.end();

        res.status(200).json({ message: 'Helper registration status updated successfully' });
    } catch (error) {
        console.error('Error updating helper registration status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get helper application status ( this is for the helper registartion, not training)
app.get('/helper/applicationStatus/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute('SELECT status FROM helper_registration_requests WHERE user_id = ?', [userId]);
        connection.end();

        // If no application status found, return 'null'
        const status = result.length > 0 ? result[0].status : null;

        res.status(200).json({ status });
    } catch (error) {
        console.error('Error fetching helper application status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Get all helper registration requests with user information
app.get('/admin/applications', async (req, res) => {
    try {
        const sql = `SELECT hrr.user_id, u.username, u.email, hrr.status 
                     FROM helper_registration_requests hrr 
                     JOIN users u ON hrr.user_id = u.user_id`;
        
        const connection = await mysql.createConnection(dbConfig);
        const [results] = await connection.execute(sql);
        connection.end();

        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching helper registration requests:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update helper registration status and user role
app.patch('/admin/applications/:userId', async (req, res) => {
    const { userId } = req.params;
    const { status } = req.body;

    try {
        const connection = await mysql.createConnection(dbConfig);
        let newRole;

        if (status === 'approved') {
            newRole = 2; // Set the new role to 'Helper' (role ID 2)
        } else if (status === 'denied') {
            newRole = 1; // Set the new role back to 'Parent/Carer' (role ID 1)
        }

        // Update user's role
        await connection.execute('UPDATE users SET role = ? WHERE user_id = ?', [newRole, userId]);

        // Update application status
        await connection.execute('UPDATE helper_registration_requests SET status = ? WHERE user_id = ?', [status, userId]);

        connection.end();

        res.status(200).json({ message: 'Helper registration status updated successfully' });
    } catch (error) {
        console.error('Error updating helper registration status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Route to submit a training application
app.post('/training/application', async (req, res) => {
    const { userId, trainingType } = req.body;

    try {
        const connection = await mysql.createConnection(dbConfig);
        
        // Insert a new training application
        await connection.execute('INSERT INTO training_applications (user_id, training_type, status) VALUES (?, ?, ?)', [userId, trainingType, 'Training']);
        
        // Update user's training status to 'training'
        await connection.execute('UPDATE users SET training_status = ? WHERE user_id = ?', ['training', userId]);

        connection.end();

        res.status(201).json({ message: 'Training application submitted successfully' });
    } catch (error) {
        console.error('Error submitting training application:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Fetch all training applications with user information
app.get('/admin/training-applications', async (req, res) => {
    const sql = `
        SELECT ta.application_id, u.user_id, u.username, u.email, u.img_path, ta.status, ta.training_type
        FROM training_applications ta
        JOIN users u ON ta.user_id = u.user_id
    `;

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [results] = await connection.execute(sql);
        connection.end();

        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching training applications:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Update training application status by admin (approve or deny)
app.patch('/admin/training-applications/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const connection = await mysql.createConnection(dbConfig);

        // Update training application status
        await connection.execute('UPDATE training_applications SET status = ? WHERE application_id = ?', [status, id]);

        // If the application is approved, update user's training status to 'trained'
        if (status === 'approved') {
            // Get the user ID associated with the training application
            const [application] = await connection.execute('SELECT user_id FROM training_applications WHERE application_id = ?', [id]);
            const userId = application[0].user_id;

            // Update user's training status
            await connection.execute('UPDATE users SET training_status = ? WHERE user_id = ?', ['trained', userId]);
        }

        connection.end();

        res.status(200).json({ message: 'Training application status updated successfully' });
    } catch (error) {
        console.error('Error updating training application status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// getting all helper availabilities with user information
app.get('/helper-availability', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [results] = await connection.execute(`
            SELECT h.helper_id, GROUP_CONCAT(' ', h.available_day) AS available_days, u.username
            FROM helper_availability h
            INNER JOIN users u ON h.helper_id = u.user_id
            GROUP BY h.helper_id
        `);
        connection.end();
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching helper availability:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/users/:userId/badge-progress', async (req, res) => {
    const { userId } = req.params;

    try {
        const connection = await mysql.createConnection(dbConfig);

        const [badges] = await connection.execute(`
            SELECT b.badge_id, b.badge_name, b.badge_info, b.badge_img,  bp.progress_percentage
            FROM badge_progress bp
            JOIN badges b ON bp.badge_id = b.badge_id
            WHERE bp.user_id = ?
        `, [userId]);

        connection.end();

        res.status(200).json(badges);
    } catch (error) {
        console.error('Error fetching badges:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
