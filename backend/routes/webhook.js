const express = require('express');
const router = express.Router();

// GET route for webhook verification
router.get('/', (req, res) => {
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

    // Parse the query parameters
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // Check if the mode and token are present
    if (mode && token) {
        // Verify the token
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            // Respond with the challenge token from the request
            res.status(200).send(challenge);
        } else {
            // Respond with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    } else {
        // Respond with '400 Bad Request' if mode or token are missing
        res.sendStatus(400);
    }
});

// POST route for handling webhook events
router.post('/', (req, res) => {
    console.log('Received a POST request:', req.body);
    const webhookEvent = req.body;

    // Handle the webhook event
    if (webhookEvent.object) {
        if (webhookEvent.entry && webhookEvent.entry[0].changes && webhookEvent.entry[0].changes[0].value.messages) {
            const messages = webhookEvent.entry[0].changes[0].value.messages;
            messages.forEach(message => {
                if (message.from) {
                    console.log(`Received message from ${message.from}: ${message.text.body}`);
                    // Here you can save the message to a database or process it further
                }
            });
        }
    }

    // Respond with '200 OK' to acknowledge receipt of the event
    res.sendStatus(200);
});

module.exports = router;