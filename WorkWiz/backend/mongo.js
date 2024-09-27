// mongo.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/workerWizard';
const client = new MongoClient(uri);

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db('workerWizard'); // Using the correct database name
        return {
            usersCollection: db.collection('userRegistrations'),
            workersCollection: db.collection('workerRegistrations'), // Added workers collection
        };
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}

module.exports = connectToMongoDB;
