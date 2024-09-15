const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const loginRoute = require('./routes/loginRoute.js'); // Import the login route
const EmployeeRouter = require('./routes/EmployeeRoutes.js'); // Import the employee router
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB) 
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use( loginRoute);
app.use('/api/employees', EmployeeRouter); 

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
