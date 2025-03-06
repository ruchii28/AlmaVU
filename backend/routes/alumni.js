

// const express = require('express');
// const router = express.Router();
// const Alumni = require('../models/Alumni'); // Adjust the path as needed

// // POST /alumni/filter - Retrieve alumni based on filters
// router.post('/filter', async (req, res) => {
//     try {
//         const { registrationNumber, batchFrom, batchTo, department, birthday, sortField, sortOrder } = req.body;
//         const filter = {};

//         if (registrationNumber) {
//             filter.registrationNumber = registrationNumber;
//         }
//         if (department) {
//             filter.department = department;
//         }
//         if (birthday) {
//             const birthdayDate = new Date(birthday);
//             const day = birthdayDate.getUTCDate();
//             const month = birthdayDate.getUTCMonth() + 1;
//             filter.$expr = {
//                 $and: [
//                     { $eq: [{ $dayOfMonth: "$birthday" }, day] },
//                     { $eq: [{ $month: "$birthday" }, month] }
//                 ]
//             };
//         }
//         if (batchFrom && batchTo) {
//             filter.batch = { $gte: batchFrom, $lte: batchTo };
//         } else if (batchFrom) {
//             filter.batch = { $gte: batchFrom };
//         } else if (batchTo) {
//             filter.batch = { $lte: batchTo };
//         }

//         let query = Alumni.find(filter);

//         // Apply sorting and ordering if provided
//         if (sortField) {
//             const sortOrderValue = sortOrder === 'desc' ? -1 : 1; // Default to ascending order
//             query = query.sort({ [sortField]: sortOrderValue });
//         }

//         const alumni = await query.exec();
//         res.json(alumni);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Alumni = require('../models/Alumni'); // Adjust the path as needed
const nodemailer = require('nodemailer');

// POST /alumni/filter - Retrieve alumni based on filters
router.post('/filter', async (req, res) => {
    try {
        const { registrationNumber, batchFrom, batchTo, department, birthday, sortField, sortOrder } = req.body;
        const filter = {};

        if (registrationNumber) {
            filter.registrationNumber = registrationNumber;
        }
        if (department) {
            filter.department = department;
        }
        if (birthday) {
            const birthdayDate = new Date(birthday);
            const day = birthdayDate.getUTCDate();
            const month = birthdayDate.getUTCMonth() + 1;
            filter.$expr = {
                $and: [
                    { $eq: [{ $dayOfMonth: "$birthday" }, day] },
                    { $eq: [{ $month: "$birthday" }, month] }
                ]
            };
        }
        if (batchFrom && batchTo) {
            filter.batch = { $gte: batchFrom, $lte: batchTo };
        } else if (batchFrom) {
            filter.batch = { $gte: batchFrom };
        } else if (batchTo) {
            filter.batch = { $lte: batchTo };
        }

        let query = Alumni.find(filter);

        // Apply sorting and ordering if provided
        if (sortField) {
            const sortOrderValue = sortOrder === 'desc' ? -1 : 1; // Default to ascending order
            query = query.sort({ [sortField]: sortOrderValue });
        }

        const alumni = await query.exec();
        res.json(alumni);
    } catch (error) {
        console.error('Error fetching alumni:', error);
        res.status(500).json({ message: error.message });
    }
});

// POST /alumni/email-content - Send emails to selected alumni
router.post('/email-content', async (req, res) => {
    try {
        const { selectedAlumni, emailContent } = req.body;

        // Validate email content
        if (!emailContent || emailContent.trim() === '') {
            throw new Error('Email content cannot be empty.');
        }

        // Fetch the email addresses and full names of the selected alumni
        const alumni = await Alumni.find({ _id: { $in: selectedAlumni } }).select('email fullName');

        // Validate alumni email addresses and full names
        if (!alumni.length) {
            throw new Error('No valid alumni found to send emails.');
        }

        // Set up the email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Send emails to the selected alumni
        const emailPromises = alumni.map(alum => {
            return transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: alum.email,
                subject: 'Event Information',
                text: `Dear ${alum.fullName},\n\n${emailContent}\n\nBest regards,\nYour Team`
            });
        });

        await Promise.all(emailPromises);

        res.status(200).json({ message: 'Emails sent successfully!' });
    } catch (error) {
        console.error('Error sending emails:', error); // Log the error to the console
        res.status(500).json({ message: 'Failed to send emails.', error: error.message });
    }
});

module.exports = router;