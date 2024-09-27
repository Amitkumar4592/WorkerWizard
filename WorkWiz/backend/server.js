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
let workersCollection; // Declare workersCollection
connectToMongoDB().then(db => {
    usersCollection = db.usersCollection;
    workersCollection = db.workersCollection; // Initialize workersCollection
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
    const { name, mobile, email, expertise, location, password } = req.body;

    try {
        const newWorker = { name, mobile, email, expertise, location, password };
        const result = await workersCollection.insertOne(newWorker);
        res.status(201).json({ success: true, message: 'Worker registered successfully', workerId: result.insertedId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error registering worker' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
