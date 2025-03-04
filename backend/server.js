// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const session = require('express-session');
// const authRoutes = require('./routes/auth');
// const alumniRoutes = require('./routes/alumni');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// // Routes
// app.use('/auth', authRoutes);
// app.use('/alumni', alumniRoutes);

// // Start server
// app.listen(3000, () => {
//     console.log('Server started on port 3000');

//     // Run the scheduler
//     require('./schedule');
// });


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const alumniRoutes = require('./routes/alumni');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/auth', authRoutes);
app.use('/alumni', alumniRoutes);

// Start server
app.listen(3000, () => {
    console.log('Server started on port 3000');

    // Run the scheduler
    require('./schedule');
});