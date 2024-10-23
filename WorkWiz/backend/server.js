const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectToMongoDB = require('./mongo');
const twilio = require('twilio');
require('dotenv').config(); // For using environment variables

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Twilio setup
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Twilio Account SID from .env
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Twilio Auth Token from .env
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Twilio phone number from .env
const client = new twilio(accountSid, authToken);

// Connect to MongoDB
let usersCollection, workersCollection;
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
        console.error('Error registering user:', err);
        res.status(500).json({ success: false, message: 'Error registering user' });
    }
});

// Worker registration endpoint
app.post('/api/register-worker', async (req, res) => {
    const { fullname, mobile, email, expertise, location, password } = req.body;

    try {
        const newWorker = { fullname, mobile, email, expertise, location, password };
        const result = await workersCollection.insertOne(newWorker);
        res.status(201).json({ success: true, message: 'Worker registered successfully', workerId: result.insertedId });
    } catch (err) {
        console.error('Error registering worker:', err);
        res.status(500).json({ success: false, message: 'Error registering worker' });
    }
});

// User login endpoint
app.post('/api/login-user', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email and password
        const user = await usersCollection.findOne({ email, password });

        if (user) {
            console.log('User found:', user);  // Add this log to check the user object
            console.log('User mobile:', user.mobile);  // Log the mobile number explicitly

            // Return success with the user's mobile number
            res.status(200).json({ success: true, message: 'Login successful', userMobile: user.mobile });
        } else {
            // If user is not found, return an error
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ success: false, message: 'Error logging in' });
    }
});



app.post('/api/assign-worker', async (req, res) => {
    const { workerMobile, employerMobile } = req.body;
    
    console.log("Employer Mobile in backend:", employerMobile); // Debugging log

    if (!employerMobile) {
        return res.status(400).json({ success: false, message: 'Employer mobile number is required.' });
    }

    try {
        const message = await client.messages.create({
            body: `You have been assigned a job. Please contact your employer for further details. Employer Contact: ${employerMobile}`,
            from: twilioPhoneNumber, // Use your Twilio phone number
            to: workerMobile
        });

        res.status(200).json({ success: true, message: 'SMS sent', sid: message.sid });
    } catch (err) {
        console.error('Error sending SMS:', err.message || err);
        res.status(500).json({ success: false, message: 'Error sending SMS: ' + (err.message || 'Unknown error') });
    }
});



// Endpoint to fetch workers based on location
app.get('/api/workers', async (req, res) => {
    const location = req.query.location;

    try {
        const workers = await workersCollection.find({ location }).toArray();
        res.json({ workers });
    } catch (err) {
        console.error('Error fetching workers:', err);
        res.status(500).json({ message: 'Error fetching workers' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
