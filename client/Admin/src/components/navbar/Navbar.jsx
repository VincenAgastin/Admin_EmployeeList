import React, { useState } from 'react';
import { MdArrowDropDown, MdMenu, MdClose } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import '../navbar/Navbar.css';
import pngimg from '../../assets/pngsImg.png';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
 
      localStorage.removeItem('userName'); 
      navigate('/');
    }
  };

  return (
    <div className="navbar bg-white p-4 flex justify-between items-center navcontent">
      <div className="flex items-center">
        <a href="/home"><img src={pngimg} alt="Logo" className="h-7 w-auto mr-4" /></a>

        <button
          className="sm:hidden text-black focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className={`flex-col sm:flex-row sm:flex ${mobileMenuOpen ? 'block' : 'hidden'} sm:block`}>
          <div className="mr-6">
            <a href="/home" className="text-black hover:text-purple block sm:inline-block">Home</a>
          </div>
          <div className="mr-6">
            <a href="/employee-list" className="text-black hover:text-purple block sm:inline-block">Employee List</a>
          </div>
        </div>
      </div>

      {/* Right Side: Admin Dropdown */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center bg-purple px-4 py-2 rounded hover:bg-lowPurple"
        >
          {localStorage.getItem('userName') || 'Admin'}
          <MdArrowDropDown className="ml-2" />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute top-full mt-2 w-40 bg-white text-black rounded shadow-lg z-10 sm:right-10">
            <button
              onClick={handleLogout} // Use handleLogout function
              className="block w-full px-4 py-2 text-left hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Overlay for Mobile Dropdown (Optional) */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 sm:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
