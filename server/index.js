require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// We need to define the User model right here or import it
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Note: In a real app, hash this!
  role: { type: String, default: 'customer' },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', UserSchema);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow Frontend to talk to Backend
app.use(express.json()); // Parse JSON data

// Connect to MongoDB Atlas using the link in your .env file
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Atlas Connected'))
  .catch(err => console.error('❌ Atlas Connection Error:', err));

// --- ROUTES ---

// Register Route
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists in the Cloud DB
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2. Create new user in the Cloud DB
    const newUser = new User({ email, password });
    await newUser.save();

    console.log(`🆕 New User Registered in Atlas: ${email}`);
    res.status(201).json({ message: 'Registration successful!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login Successful', user: { email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
