// // const express = require('express');
// // const Alumni = require('../models/Alumni'); // Adjust the path as needed

// // const router = express.Router();

// // // Filter alumni data based on provided criteria
// // router.post('/filter', async (req, res) => {
// //     const { registrationNumber, batch, department, birthday, page = 1, limit = 10, sortField = 'fullName', sortOrder = 1 } = req.body;
    
// //     console.log('Filter request received:', req.body);

// //     const query = {};
// //     if (registrationNumber) query.registrationNumber = registrationNumber;
// //     if (batch) query.batch = batch;
// //     if (department) query.department = department;

// //     const aggregationPipeline = [
// //         { $match: query },
// //         { $addFields: { "birthdayDay": { $dayOfMonth: "$birthday" }, "birthdayMonth": { $month: "$birthday" } } }
// //     ];

// //     if (birthday) {
// //         const date = new Date(birthday);
// //         const day = date.getUTCDate();
// //         const month = date.getUTCMonth() + 1; // Months are 0-based in JavaScript
// //         aggregationPipeline.push({ $match: { "birthdayDay": day, "birthdayMonth": month } });
// //     }

// //     aggregationPipeline.push(
// //         { $sort: { [sortField]: sortOrder } },
// //         { $skip: (page - 1) * limit },
// //         { $limit: limit }
// //     );

// //     console.log('Aggregation Pipeline:', JSON.stringify(aggregationPipeline, null, 2));

// //     try {
// //         const alumni = await Alumni.aggregate(aggregationPipeline).exec();

// //         console.log('Alumni found:', alumni);

// //         if (alumni.length === 0) {
// //             res.status(200).json([]);
// //         } else {
// //             res.status(200).json(alumni);
// //         }
// //     } catch (err) {
// //         console.error('Error fetching filtered alumni data:', err);
// //         res.status(500).json({ message: 'Internal server error' });
// //     }
// // });

// // module.exports = router;


// const express = require('express');
// const nodemailer = require('nodemailer');
// const Alumni = require('../models/Alumni'); // Adjust the path as needed

// const router = express.Router();

// // Filter alumni data based on provided criteria
// router.post('/filter', async (req, res) => {
//     const { registrationNumber, batch, department, birthday, page = 1, limit = 10, sortField = 'fullName', sortOrder = 1 } = req.body;
    
//     console.log('Filter request received:', req.body);

//     const query = {};
//     if (registrationNumber) query.registrationNumber = registrationNumber;
//     if (batch) query.batch = batch;
//     if (department) query.department = department;

//     const aggregationPipeline = [
//         { $match: query },
//         { $addFields: { "birthdayDay": { $dayOfMonth: "$birthday" }, "birthdayMonth": { $month: "$birthday" } } }
//     ];

//     if (birthday) {
//         const date = new Date(birthday);
//         const day = date.getUTCDate();
//         const month = date.getUTCMonth() + 1; // Months are 0-based in JavaScript
//         aggregationPipeline.push({ $match: { "birthdayDay": day, "birthdayMonth": month } });
//     }

//     aggregationPipeline.push(
//         { $sort: { [sortField]: sortOrder } },
//         { $skip: (page - 1) * limit },
//         { $limit: limit }
//     );

//     console.log('Aggregation Pipeline:', JSON.stringify(aggregationPipeline, null, 2));

//     try {
//         const alumni = await Alumni.aggregate(aggregationPipeline).exec();

//         console.log('Alumni found:', alumni);

//         if (alumni.length === 0) {
//             res.status(200).json([]);
//         } else {
//             res.status(200).json(alumni);
//         }
//     } catch (err) {
//         console.error('Error fetching filtered alumni data:', err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // Fetch the list of all alumni
// router.get('/list', async (req, res) => {
//     try {
//         const alumni = await Alumni.find().exec();
//         res.status(200).json(alumni);
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to fetch alumni list' });
//     }
// });

// // Send email to selected alumni
// router.post('/send-email', async (req, res) => {
//     const { selectedAlumni, emailContent } = req.body;

//     try {
//         const alumni = await Alumni.find({ _id: { $in: selectedAlumni } }).exec();

//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS
//             }
//         });

//         for (const alum of alumni) {
//             const mailOptions = {
//                 from: process.env.EMAIL_USER,
//                 to: alum.email,
//                 subject: 'Event Invitation',
//                 text: emailContent
//             };

//             await transporter.sendMail(mailOptions);
//         }

//         res.status(200).json({ message: 'Emails sent successfully' });
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to send emails' });
//     }
// });

// module.exports = router;



const express = require('express');
const nodemailer = require('nodemailer');
const Alumni = require('../models/Alumni'); // Adjust the path as needed

const router = express.Router();

// Filter alumni data based on provided criteria
router.post('/filter', async (req, res) => {
    const { registrationNumber, batch, department, birthday, page = 1, limit = 10, sortField = 'fullName', sortOrder = 1 } = req.body;
    
    const query = {};
    if (registrationNumber) query.registrationNumber = registrationNumber;
    if (batch) query.batch = batch;
    if (department) query.department = department;

    const aggregationPipeline = [
        { $match: query },
        { $addFields: { "birthdayDay": { $dayOfMonth: "$birthday" }, "birthdayMonth": { $month: "$birthday" } } }
    ];

    if (birthday) {
        const date = new Date(birthday);
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1; // Months are 0-based in JavaScript
        aggregationPipeline.push({ $match: { "birthdayDay": day, "birthdayMonth": month } });
    }

    aggregationPipeline.push(
        { $sort: { [sortField]: sortOrder } },
        { $skip: (page - 1) * limit },
        { $limit: limit }
    );

    try {
        const alumni = await Alumni.aggregate(aggregationPipeline).exec();
        res.status(200).json(alumni);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Send email to selected alumni
router.post('/send-email', async (req, res) => {
    const { selectedAlumni, emailContent } = req.body;

    try {
        const alumni = await Alumni.find({ _id: { $in: selectedAlumni } }).exec();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        for (const alum of alumni) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: alum.email,
                subject: 'Event Invitation',
                text: emailContent
            };

            await transporter.sendMail(mailOptions);
        }

        res.status(200).json({ message: 'Emails sent successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to send emails' });
    }
});

module.exports = router;