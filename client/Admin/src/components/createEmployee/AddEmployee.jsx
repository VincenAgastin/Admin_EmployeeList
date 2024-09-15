import React, { useEffect, useState } from 'react';
import './CreateEmployee.css';
import Navbar from '../navbar/Navbar';
import { FaTimes } from 'react-icons/fa'; // Import the close icon from react-icons
import { CreateEmployee } from '../../api'
import { UpdateEmployeeById } from '../../api'

const AddEmployee = ({ showModal, setShowModal ,fetchEmployees ,updateEmpObj}) => {
  const [formData, setFormData] = useState({
    employeename: '',
    email: '',
    phone: '',
    designation: '',
    gender: '',
    course: '',
    image: null,
  });

  const [updateMode,setUpdateMode]=useState(false)

  useEffect(()=>{
    if(updateEmpObj){
        setUpdateMode(true)
        setFormData(updateEmpObj)
    }
  },[updateEmpObj])

  const resetEmployeeStates=()=>{
    setFormData({
        employeename: '',
        email: '',
        phone: '',
        designation: '',
        gender: '',
        course: '',
        image: null,
      })
  }

  const [errors, setErrors] = useState({});

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    const newErrors = {};

    try{
        const {success,message}=updateMode ? await UpdateEmployeeById(formData,formData._id) : await CreateEmployee(formData);
        console.log(success,message);
        if(success){
            console.log("success",message);
        }else{
            console.log("Error",message);
        }
        setShowModal(false)
        resetEmployeeStates();
        fetchEmployees();
    }catch(err){
        console.log("Error to create ",err)
    }


    console.log(formData);
    // Name validation
    if (!formData.employeename) newErrors.employeename = 'Name is required';

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

  const onClose=()=>{
    setShowModal(false)
  }

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
            <form onSubmit={(e)=>handleSubmit(e)} className="space-y-3">
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
                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
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
                  <label>
                    <input
                      type="checkbox"
                      name="course"
                      value="MCA"
                      onChange={handleChange}
                      checked={formData.course === 'MCA'}
                    />{' '}
                    MCA
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="course"
                      value="MBA"
                      onChange={handleChange}
                      checked={formData.course === 'MBA'}
                    />{' '}
                    MBA
                  </label>
                  <label>
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
                {
                    updateMode ? 'Update' : 'Submit'
                }
                
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddEmployee;
