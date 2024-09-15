const express = require('express');
const { createEmployee, getAllEmployees, getEmployeeById, deleteEmployeeById, updateEmployeeById } = require('../controllers/EmployeeController');
const { cloudinaryFileUploader } = require('../Middlewares/FileUploader');
const router = express.Router(); // Use `express.Router()` to define a router

// Define the route
router.get('/', getAllEmployees);

router.post('/',cloudinaryFileUploader.single('image'),createEmployee)

router.put('/:id',cloudinaryFileUploader.single('image'),updateEmployeeById)

router.get('/:id', getEmployeeById);

router.delete('/:id', deleteEmployeeById);





module.exports = router;
