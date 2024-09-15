const express = require('express');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/UserModel.js'); // Import the UserModel

const router = express.Router();

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

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect username or password' });
    }

    // Success
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Server error:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
