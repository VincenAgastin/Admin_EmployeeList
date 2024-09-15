import React, { useState } from 'react'
import './CreateEmployee.css'
import Navbar from '../navbar/Navbar'
const EmployeeDetails = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    designation: '',
    gender: '',
    course: '',
    image: null,
  });

  const [errors, setErrors] = useState({});

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Name validation
    if (!formData.name) newErrors.name = 'Name is required';

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.length !== 10) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    // Designation validation
    if (!formData.designation) {
      newErrors.designation = 'Designation is required';
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    // Course validation
    if (!formData.course) {
      newErrors.course = 'Course is required';
    }

    // Image validation
    if (!formData.image) {
      newErrors.image = 'Image is required';
    }

    setErrors(newErrors);

    // If no errors, submit form data
    if (Object.keys(newErrors).length === 0) {
      console.log('Form Submitted', formData);
      // Handle form submission logic here
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen lineargradient p-8">
      <nav className="mb-4">
        <h1 className="text-2xl font-bold ">Create Employee</h1>
      </nav>
      <div className="flex flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-full max-w-md"
        >
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Phone Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          {/* Designation Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Designation</label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="">Select Designation</option>
              <option value="Sales Executive">Sales Executive</option>
              <option value="HR">HR</option>
              <option value="Accountant">Accountant</option>
              <option value="Marketing Manager">Marketing Manager</option>
              <option value="Sales Manager">Sales Manager</option>
              <option value="Finance Officer">Finance Officer</option>
            </select>
            {errors.designation && <p className="text-red-500 text-sm">{errors.designation}</p>}
          </div>

          {/* Gender Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Gender</label>
            <div className="flex">
              <label className="mr-4">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                  checked={formData.gender === 'Male'}
                />{' '}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                  checked={formData.gender === 'Female'}
                />{' '}
                Female
              </label>
            </div>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </div>

          {/* Course Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Course</label>
            <div>
              <label className="mr-4">
                <input
                  type="checkbox"
                  name="course"
                  value="MCA"
                  onChange={handleChange}
                  checked={formData.course === 'MCA'}
                />{' '}
                MCA
              </label>
              <label className="mr-4">
                <input
                  type="checkbox"
                  name="course"
                  value="MBA"
                  onChange={handleChange}
                  checked={formData.course === 'MBA'}
                />{' '}
                MBA
              </label>
              <label className="mr-4">
                <input
                  type="checkbox"
                  name="course"
                  value="BSC"
                  onChange={handleChange}
                  checked={formData.course === 'BSC'}
                />{' '}
                BSC
              </label>
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="CSE"
                  onChange={handleChange}
                  checked={formData.course === 'CSE'}
                />{' '}
                CSE
              </label>
            </div>
            {errors.course && <p className="text-red-500 text-sm">{errors.course}</p>}
          </div>

          {/* Image Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded"
            />
            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default EmployeeDetails