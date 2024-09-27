// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectToMongoDB = require('./mongo');

const app = express();
const port = 5000; // Changed to port 5000 as you initially mentioned

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
let usersCollection;
let workersCollection;
connectToMongoDB().then(db => {
    usersCollection = db.usersCollection;
    workersCollection = db.workersCollection;
});

// User registration endpoint
app.post('/api/register-user', async (req, res) => {
    const { fullname, mobile, email, password, address } = req.body;

    try {
        const newUser = { fullname, mobile, email, password, address };
        const result = await usersCollection.insertOne(newUser);
        res.status(201).json({ success: true, message: 'User registered successfully', userId: result.insertedId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error registering user' });
    }
});

// Worker registration endpoint
app.post('/api/register-worker', async (req, res) => {
    const { name, mobile, email, password, expertise, location } = req.body;

    try {
        const newWorker = { name, mobile, email, password, expertise, location };
        const result = await workersCollection.insertOne(newWorker);
        res.status(201).json({ success: true, message: 'Worker registered successfully', workerId: result.insertedId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error registering worker' });
    }
});

// User login endpoint
app.post('/api/login-user', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await usersCollection.findOne({ email, password });
        if (user) {
            res.status(200).json({ success: true, message: 'User logged in successfully', user });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error logging in user' });
    }
});

// Worker login endpoint
app.post('/api/login-worker', async (req, res) => {
    const { email, password } = req.body;

    try {
        const worker = await workersCollection.findOne({ email, password });
        if (worker) {
            res.status(200).json({ success: true, message: 'Worker logged in successfully', worker });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error logging in worker' });
    }
});

// Fetch workers based on location
app.get('/api/workers', async (req, res) => {
    const { location } = req.query;

    try {
        const workers = await workersCollection.find({ location }).toArray(); // Assuming location is stored in the worker's document
        res.status(200).json({ success: true, workers });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error fetching workers' });
    }
});


// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
