const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel.js'); // Import the UserModel

const router = express.Router();

// Secret key for JWT
const JWT_SECRET = 'your_secret_key'; 

// Seed the database with an admin user
const seedAdminUser = async () => {
  try {
    const existingUser = await UserModel.findOne({ name: 'Admin' });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('admin007', 10);
      const admin = new UserModel({ name: 'Admin', password: hashedPassword });
      await admin.save();
      console.log('Admin user seeded');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
};
seedAdminUser();

// Login Route
router.post('/api/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await UserModel.findOne({ name });
    if (!user) {
      return res.status(400).json({ message: 'Incorrect username or password' });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect username or password' });
    }

    
    const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, { expiresIn: '1h' });
    
    
    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Server error:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
});

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.sendStatus(401); 
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); 
    }
    req.user = user; 
    next(); 
  });
};


router.get('/api/protected', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Welcome to the protected route!', user: req.user });
});


module.exports = router;
