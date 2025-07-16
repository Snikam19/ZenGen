const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Replace with your MongoDB connection string
const mongoURI = 'your-mongodb-connection-string';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Patient Schema
const patientSchema = new mongoose.Schema({
    name: String,
    email: String,
    doctorName: String,
    appointmentDate: String,
    appointmentTime: String,
    notes: String
});

const Patient = mongoose.model('Patient', patientSchema);

// Route to handle appointment bookings
app.post('/api/book-appointment', async (req, res) => {
    const { name, email, doctorName, appointmentDate, appointmentTime, notes } = req.body;

    try {
        const newPatient = new Patient({
            name,
            email,
            doctorName,
            appointmentDate,
            appointmentTime,
            notes
        });

        await newPatient.save();
        res.status(201).json({ message: 'Appointment booked successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
