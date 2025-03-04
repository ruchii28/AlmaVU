const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/AlumniDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model('User', UserSchema);

const email = "ruchita.2801@gmail.com";
const plainTextPassword = "1234";

// Hash the password
bcrypt.hash(plainTextPassword, 10)
  .then(hash => {
    // Insert the user into the database
    const newUser = new User({ email: email, password: hash });
    return newUser.save();
  })
  .then(() => {
    console.log('User inserted successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error inserting user:', err);
    mongoose.connection.close();
  });