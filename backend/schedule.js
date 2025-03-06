// require('dotenv').config();
// const mongoose = require('mongoose');
// const axios = require('axios');
// const Alumni = require('./models/Alumni'); // Adjust the path as needed

// // MongoDB connection URI
// const mongoURI = process.env.MONGO_URI;

// // WhatsApp API credentials
// const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
// const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
// const WHATSAPP_TEMPLATE_NAME = 'birthday_wish'; // Replace with your template name
// const WHATSAPP_LANGUAGE_CODE = 'en_US'; // Replace with your template language code

// // Function to send WhatsApp message using a template
// const sendWhatsAppMessage = async (phoneNumber, templateName, languageCode, variables) => {
//     try {
//         const response = await axios.post(
//             `https://graph.facebook.com/v17.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
//             {
//                 messaging_product: 'whatsapp',
//                 to: phoneNumber,
//                 type: 'template',
//                 template: {
//                     name: templateName,
//                     language: {
//                         code: languageCode
//                     },
//                     components: [
//                         {
//                             type: 'body',
//                             parameters: variables.map(variable => ({ type: 'text', text: variable }))
//                         }
//                     ]
//                 }
//             },
//             {
//                 headers: {
//                     'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );
//         console.log(`Message sent to ${phoneNumber}: `, response.data);
//     } catch (error) {
//         console.error(`Failed to send message to ${phoneNumber}: `, error.response ? error.response.data : error.message);
//     }
// };

// // Function to send birthday wishes
// async function sendBirthdayWishes() {
//     // Connect to MongoDB
//     await mongoose.connect(mongoURI);

//     // Get the current date
//     const currentDate = new Date();
//     const currentDay = currentDate.getUTCDate();
//     const currentMonth = currentDate.getUTCMonth() + 1; // Months are 0-based

//     try {
//         console.log('Checking for alumni with birthdays today...');

//         // Find alumni with birthdays today
//         const alumniWithBirthdayToday = await Alumni.aggregate([
//             { $addFields: { birthdayDay: { $dayOfMonth: '$birthday' }, birthdayMonth: { $month: '$birthday' } } },
//             { $match: { birthdayDay: currentDay, birthdayMonth: currentMonth } }
//         ]);

//         if (alumniWithBirthdayToday.length === 0) {
//             console.log('No alumni have birthdays today.');
//             return;
//         }

//         // Display alumni whose birthdays are today
//         console.log('Alumni with birthdays today:');
//         alumniWithBirthdayToday.forEach(alumni => {
//             console.log(`- ${alumni.fullName} (${alumni.contact})`);
//         });

//         // Send WhatsApp messages to each alumni
//         for (const alumni of alumniWithBirthdayToday) {
//             const variables = [alumni.fullName]; // Add more variables if your template requires them

//             try {
//                 await sendWhatsAppMessage(alumni.contact, WHATSAPP_TEMPLATE_NAME, WHATSAPP_LANGUAGE_CODE, variables);
//                 console.log(`Birthday wish sent to: ${alumni.contact}`);
//             } catch (error) {
//                 console.error(`Failed to send birthday wish to: ${alumni.contact}`, error);
//             }
//         }
//     } catch (error) {
//         console.error('Error sending birthday wishes:', error);
//     } finally {
//         // Disconnect from MongoDB
//         await mongoose.disconnect();
//     }
// }

// // Run the function
// sendBirthdayWishes();

const cron = require('node-cron');
const { exec } = require('child_process');

// Function to run the birthday wishes script
function runBirthdayWishes() {
    exec('node scripts/birthdayWishes.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
        console.log(`Stdout: ${stdout}`);
    });
}

// Schedule the task to run at 8:00 AM every day
cron.schedule('0 8 * * *', runBirthdayWishes);

// Run the task immediately for testing purposes
runBirthdayWishes();

console.log('Cron job scheduled to send birthday wishes at 8:00 AM every day.');
console.log('Birthday wishes script is being run immediately for testing.');