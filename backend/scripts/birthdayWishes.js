require('dotenv').config();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const Alumni = require('../models/Alumni'); // Adjust the path as needed

// MongoDB connection URI
const mongoURI = process.env.MONGO_URI;

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS  // Your email password or an app-specific password
    }
});

// Function to select a template
function selectTemplate() {
    const templates = ['template1.html', 'template2.html', 'template3.html'];
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    const templateIndex = dayOfMonth % templates.length;
    const templatePath = path.join(__dirname, '..', 'templates', templates[templateIndex]);
    return fs.readFileSync(templatePath, 'utf-8');
}

// Function to send birthday wishes
async function sendBirthdayWishes() {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);

    // Get the current date
    const currentDate = new Date();
    const currentDay = currentDate.getUTCDate();
    const currentMonth = currentDate.getUTCMonth() + 1; // Months are 0-based

    try {
        // Find alumni with birthdays today
        const alumniWithBirthdayToday = await Alumni.aggregate([
            { $addFields: { "birthdayDay": { $dayOfMonth: "$birthday" }, "birthdayMonth": { $month: "$birthday" } } },
            { $match: { "birthdayDay": currentDay, "birthdayMonth": currentMonth } }
        ]);

        // Select the email template
        const template = selectTemplate();

        // Send emails to each alumni
        for (const alumni of alumniWithBirthdayToday) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: alumni.email,
                subject: 'Happy Birthday!',
                html: template.replace('{{fullName}}', alumni.fullName)
            };

            await transporter.sendMail(mailOptions);
            console.log(`Birthday wish sent to: ${alumni.email}`);
        }
    } catch (error) {
        console.error('Error sending birthday wishes:', error);
    } finally {
        // Disconnect from MongoDB
        await mongoose.disconnect();
    }
}

// Run the function
sendBirthdayWishes();