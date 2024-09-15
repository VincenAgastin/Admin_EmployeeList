import React from 'react';
import './CreateEmployee.css';

const EmployeeTable = ({employees,pagination,fetchEmployees,handleUpdateEmployee,handleDeleteEmployee}) => {
  const headers = ["Name", "Image", "Email", "Phone", "Designation", "Gender", "Course", "Actions"];

 const {currentPage,totalpages,totolEmployess} =pagination
  const TableRow = ({employee}) => {
    return (
      <tr className="bg-white border-b hover:bg-gray-100">
        <td className="px-6 py-4">
            {employee.employeename}
        </td>
        <td className="px-6 py-4">
          <img src={employee.image} alt="Employee" className="w-10 h-10 rounded-full object-cover" />
        </td>
        <td className="px-6 py-4">{employee.email}</td>
        <td className="px-6 py-4">{employee.phone}</td>
        <td className="px-6 py-4">{employee.designation}</td>
        <td className="px-6 py-4">{employee.gender}</td>
        <td className="px-6 py-4">{employee.course}</td>
        <td className="px-6 py-4">
          <button 
            onClick={() => {handleUpdateEmployee(employee)}}
            className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
          >
            Edit
          </button>
          <button 
            onClick={() => {handleDeleteEmployee(employee)}}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  };

  const pageNumbers=Array.from({length:totalpages},(_,index)=>index+1);

  const handleNextPage=()=>{
    if(currentPage<totalpages){
        handlePagination(currentPage+1)
    }
  }
  const handlePreviousPage=()=>{
    if(currentPage > 1){
        handlePagination(currentPage - 1)
    }
  }

  const handlePagination=(currpage)=>{
    fetchEmployees('',currpage,5)
  }



  return (
    <div className="overflow-x-auto mb-20">
        <h1 className='text-center p-4 text-2xl'>Total Count <span className='text-purple font-semibold text-2xl'>{totolEmployess}</span></h1>
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr className="bg-gray-200">
            {headers.map((header, i) => (
              <th key={i} className="px-6 py-3 text-left text-gray-600 uppercase font-semibold text-sm">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
            {
                employees.map((emp)=>(
                    <TableRow key={emp._id} employee={emp} />
                ))
            }
          
        </tbody>
      </table>
      <div className="flex flex-col items-center space-y-4">
  <span className="text-gray-700 font-medium">
    Page {currentPage} of {totalpages}
  </span>
  <div className="space-x-4">
    <button 
      onClick={() => handlePreviousPage()} 
      disabled={currentPage === 1} 
      className={`px-4 py-2 bg-purple text-white font-semibold rounded-lg shadow-md hover:bg-lowPurple focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${
        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      Previous
    </button>
    {pageNumbers.map((page) => (
  <button
    key={page}
    
    className={`px-3 py-2 rounded-lg mx-1 ${
      page === currentPage
        ? 'bg-purple text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-lowPurple hover:text-white'
    } focus:outline-none focus:none  focus:ring-opacity-75`}
  >
    {page}
  </button>
))}
    <button 
      onClick={() => handleNextPage()} 
      disabled={totalpages === currentPage} 
      className={`px-4 py-2 bg-lowPurple text-white font-semibold rounded-lg shadow-md hover:bg-purple focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${
        totalpages === currentPage ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      Next
    </button>
  </div>
</div>

    </div>
  );
};

export default EmployeeTable;
