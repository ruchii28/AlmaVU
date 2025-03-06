
require('dotenv').config();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const axios = require('axios');
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

// WhatsApp API credentials
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_TEMPLATE_NAME = 'birthday_wish'; // Replace with your template name
const WHATSAPP_LANGUAGE_CODE = 'en_US'; // Replace with your template language code

// Function to select an email template
function selectEmailTemplate() {
    const templates = ['template1.html', 'template2.html', 'template3.html'];
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    const templateIndex = dayOfMonth % templates.length;
    const templatePath = path.join(__dirname, '..', 'templates', templates[templateIndex]);
    return fs.readFileSync(templatePath, 'utf-8');
}

// Function to send WhatsApp message using a template
const sendWhatsAppMessage = async (phoneNumber, templateName, languageCode, variables) => {
    try {
        const response = await axios.post(
            `https://graph.facebook.com/v17.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: 'whatsapp',
                to: phoneNumber,
                type: 'template',
                template: {
                    name: templateName,
                    language: {
                        code: languageCode
                    },
                    components: [
                        {
                            type: 'body',
                            parameters: variables.map(variable => ({ type: 'text', text: variable }))
                        }
                    ]
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log(`Message sent to ${phoneNumber}: `, response.data);
    } catch (error) {
        console.error(`Failed to send message to ${phoneNumber}: `, error.response ? error.response.data : error.message);
    }
};

// Function to send birthday wishes
async function sendBirthdayWishes() {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);

    // Get the current date
    const currentDate = new Date();
    const currentDay = currentDate.getUTCDate();
    const currentMonth = currentDate.getUTCMonth() + 1; // Months are 0-based

    try {
        console.log('Checking for alumni with birthdays today...');

        // Find alumni with birthdays today
        const alumniWithBirthdayToday = await Alumni.aggregate([
            { $addFields: { birthdayDay: { $dayOfMonth: '$birthday' }, birthdayMonth: { $month: '$birthday' } } },
            { $match: { birthdayDay: currentDay, birthdayMonth: currentMonth } }
        ]);

        if (alumniWithBirthdayToday.length === 0) {
            console.log('No alumni have birthdays today.');
            return;
        }

        // Display alumni whose birthdays are today
        console.log('Alumni with birthdays today:');
        alumniWithBirthdayToday.forEach(alumni => {
            console.log(`- ${alumni.fullName} (${alumni.email}, ${alumni.contact})`);
        });

        // Select the email template
        const emailTemplate = selectEmailTemplate();

        // Send emails and WhatsApp messages to each alumni
        for (const alumni of alumniWithBirthdayToday) {
            const emailOptions = {
                from: process.env.EMAIL_USER,
                to: alumni.email,
                subject: 'Happy Birthday!',
                html: emailTemplate.replace('{{name}}', alumni.fullName)
            };

            try {
                await transporter.sendMail(emailOptions);
                console.log(`Birthday email sent to: ${alumni.email}`);
            } catch (error) {
                console.error(`Failed to send birthday email to: ${alumni.email}`, error);
            }

            const whatsappVariables = [alumni.fullName];
            try {
                await sendWhatsAppMessage(alumni.contact, WHATSAPP_TEMPLATE_NAME, WHATSAPP_LANGUAGE_CODE, whatsappVariables);
                console.log(`Birthday WhatsApp message sent to: ${alumni.contact}`);
            } catch (error) {
                console.error(`Failed to send birthday WhatsApp message to: ${alumni.contact}`, error);
            }
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