
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const alumniRoutes = require('./routes/alumni'); // Add alumni routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Database connection error:', err));

app.use('/auth', authRoutes);
app.use('/alumni', alumniRoutes); // Use alumni routes

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// const express = require('express');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(bodyParser.json());

// app.get('/webhook', (req, res) => {
//     const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

//     // Parse the query parameters
//     const mode = req.query['hub.mode'];
//     const token = req.query['hub.verify_token'];
//     const challenge = req.query['hub.challenge'];

//     // Check if the mode and token are present
//     if (mode && token) {
//         // Verify the token
//         if (mode === 'subscribe' && token === VERIFY_TOKEN) {
//             console.log('WEBHOOK_VERIFIED');
//             // Respond with the challenge token from the request
//             res.status(200).send(challenge);
//         } else {
//             // Respond with '403 Forbidden' if verify tokens do not match
//             res.sendStatus(403);
//         }
//     } else {
//         // Respond with '400 Bad Request' if mode or token are missing
//         res.sendStatus(400);
//     }
// });

// app.post('/webhook', (req, res) => {
//     console.log('Received a POST request:', req.body);
//     const webhookEvent = req.body;

//     // Handle the webhook event
//     if (webhookEvent.object) {
//         webhookEvent.entry.forEach(entry => {
//             entry.changes.forEach(change => {
//                 if (change.value.messages) {
//                     const messages = change.value.messages;
//                     messages.forEach(message => {
//                         console.log(`Received message from ${message.from}: ${message.text.body}`);
//                         // Here you can process the received message
//                         // For example, save it to a database or trigger an action
//                     });
//                 }

//                 if (change.value.message_echoes) {
//                     const echoes = change.value.message_echoes;
//                     echoes.forEach(echo => {
//                         console.log(`Received echo from ${echo.from}: ${echo.text.body}`);
//                     });
//                 }

//                 if (change.value.message_handovers) {
//                     const handovers = change.value.message_handovers;
//                     handovers.forEach(handover => {
//                         console.log(`Received handover event: ${handover}`);
//                     });
//                 }
//             });
//         });
//     }

//     res.sendStatus(200);
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });