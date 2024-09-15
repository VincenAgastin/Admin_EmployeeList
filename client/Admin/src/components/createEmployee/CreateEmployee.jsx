import React, { useEffect, useState } from 'react'
import '../createEmployee/CreateEmployee.css'
import Navbar from '../navbar/Navbar'
import EmployeeTable from './EmployeeTable'
import { GetAllEmployees } from '../../api'
import { DeleteEmployeeById } from '../../api'
import AddEmployee from './AddEmployee'

const CreateEmployee = () => {

  const [showModal,setShowModal]=useState(false)
  const [updateEmpObj,setUpdateEmpObj]=useState(null)


  const [employeeData,setEmployeeData]=useState({
    "employees":[],
    "pagination": {
      "totolEmployess": 0,
      "currentPage": 1,
      "totalpages": 1,
      "pageSize": 5
    }
  });

  const fetchEmployees=async(search='',page=1,limit=5)=>{
    try{
      const {data} =await GetAllEmployees(search,page,limit);
      setEmployeeData(data)

    }catch(err){
      console.log("Error",err);
    }
  }

  
  
  useEffect(()=>{
    fetchEmployees()
  },[])
  
  const handleAddEmployee=()=>{
    setShowModal(true)
  }

  //Handling the Update Employee
  
  const handleUpdateEmployee=(empObj)=>{
    console.log('Update Obj,',empObj);
    setUpdateEmpObj(empObj);
    setShowModal(true)
  }

  //Handling the Delete Employee

  const handleDeleteEmployee = async (emp) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete the employee : ${emp.employeename}?`);

    if (!isConfirmed) {
        // If the user clicks "Cancel", simply return and do nothing
        return;
    }

    try {
        const { success, message } = await DeleteEmployeeById(emp._id);
        if (success) {
            console.log("Success:", message);
            fetchEmployees(); // Refresh the employee list
        } else {
            console.log("Error:", message);
        }
    } catch (err) {
        console.log("Error:", err);
    }
};

//Searchbar for Employee List
const handleSearch=(e)=>{
  const term=e.target.value;
  fetchEmployees(term)
}




  return (
    <div>
      <Navbar />
      <h1 className='text-purple text-3xl text-center mt-10 font-semibold'>Employee List</h1>

        <div className="mb-4 flex justify-around mt-8">
                  <button className="bg-purple text-white px-4 py-2 rounded mr-4 outline-none" onClick={handleAddEmployee}>Create Employee</button>
                  <input
                    onChange={handleSearch}
                    type="text"
                    placeholder="Search Employee..."
                    className="px-4 py-2 border-2 border-black rounded outline-none"
                  />
        </div>

        <EmployeeTable 
        fetchEmployees={fetchEmployees}
        handleUpdateEmployee={handleUpdateEmployee}
        employees={employeeData.employees}
        pagination={employeeData.pagination}
        handleDeleteEmployee={handleDeleteEmployee}
        />

        <AddEmployee 
         showModal={showModal}
         updateEmpObj={updateEmpObj}
         setShowModal={setShowModal} 
         fetchEmployees={fetchEmployees}  />

    </div>
  )
}

export default CreateEmployee