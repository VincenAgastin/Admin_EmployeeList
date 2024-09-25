import React, { useEffect, useState } from 'react';
import './CreateEmployee.css';
import { FaTimes } from 'react-icons/fa';
import { CreateEmployee, UpdateEmployeeById } from '../../api';

const AddEmployee = ({ showModal, setShowModal, fetchEmployees, updateEmpObj }) => {
  const [formData, setFormData] = useState({
    employeename: '',
    email: '',
    phone: '',
    designation: '',
    gender: '',
    course: [], // Initialize as an empty array
    image: null,
  });

  const [updateMode, setUpdateMode] = useState(false);

  // Pre-populate form if updateEmpObj is provided
  useEffect(() => {
    if (updateEmpObj) {
      setUpdateMode(true);
      setFormData(updateEmpObj);
    }
  }, [updateEmpObj]);

  const resetEmployeeStates = () => {
    setFormData({
      employeename: '',
      email: '',
      phone: '',
      designation: '',
      gender: '',
      course: [],
      image: null,
    });
  };

  const [errors, setErrors] = useState({});

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate form data
    if (!formData.employeename) newErrors.employeename = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (formData.phone.length !==10) newErrors.phone = 'Phone number must be exactly 10 digits';
    if (!formData.designation) newErrors.designation = 'Designation is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (formData.course.length === 0) newErrors.course = 'At least one course must be selected';
    if (!formData.image && !updateMode) newErrors.image = 'Image is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const { success, message } = updateMode
          ? await UpdateEmployeeById(formData, formData._id)
          : await CreateEmployee(formData);
        console.log(success, message);
        if (success) {
          setShowModal(false);
          resetEmployeeStates();
          fetchEmployees();
        }
      } catch (err) {
        console.log("Error while creating/updating employee", err);
      }
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

  // Handle multiple course selections
  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData((prevState) => ({
        ...prevState,
        course: [...prevState.course, value], // Add the selected course
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        course: prevState.course.filter((course) => course !== value), // Remove the deselected course
      }));
    }
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          tabIndex={-1}
          role="dialog"
        >
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-xs relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <FaTimes size={20} />
            </button>
            <nav className="mb-4 flex items-center justify-between">
              <h1 className="text-lg font-bold">{updateMode ? "Update Employee" : "Create Employee"}</h1>
            </nav>
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name Field */}
              <div>
                <label className="block text-gray-700 text-sm">Name</label>
                <input
                  type="text"
                  name="employeename"
                  value={formData.employeename}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {errors.employeename && <p className="text-red-500 text-xs">{errors.employeename}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-700 text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-gray-700 text-sm">Phone</label>
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
              </div>

              {/* Designation Field */}
              <div>
                <label className="block text-gray-700 text-sm">Designation</label>
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="">Select Designation</option>
                  <option value="Sales Executive">Sales Executive</option>
                  <option value="HR">HR</option>
                  <option value="Accountant">Accountant</option>
                  <option value="Marketing Manager">Marketing Manager</option>
                  <option value="Sales Manager">Sales Manager</option>
                  <option value="Finance Officer">Finance Officer</option>
                </select>
                {errors.designation && <p className="text-red-500 text-xs">{errors.designation}</p>}
              </div>

              {/* Gender Field */}
              <div>
                <label className="block text-gray-700 text-sm">Gender</label>
                <div className="flex space-x-3">
                  <label>
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
                {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
              </div>

              {/* Course Field */}
              <div>
                <label className="block text-gray-700 text-sm">Course</label>
                <div className="space-y-1">
                  {["MCA", "MBA", "BSC", "CSE"].map(course => (
                    <label key={course}>
                      <input
                        type="checkbox"
                        name="course"
                        value={course}
                        onChange={handleCourseChange}
                        checked={formData.course.includes(course)} // Check if course is selected
                      />{' '}
                      {course}
                    </label>
                  ))}
                </div>
                {errors.course && <p className="text-red-500 text-xs">{errors.course}</p>}
              </div>

              {/* Image Field */}
              <div>
                <label className="block text-gray-700 text-sm">Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {errors.image && <p className="text-red-500 text-xs">{errors.image}</p>}
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
              >
                {updateMode ? 'Update' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddEmployee;
