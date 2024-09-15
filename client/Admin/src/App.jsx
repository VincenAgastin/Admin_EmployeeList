import React from 'react'
import './App.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import ErrorHandle from './components/error/ErrorHandle'
import CreateEmployee from './components/createEmployee/CreateEmployee'
import EmployeeDetails from './components/createEmployee/EmployeeDetails'

const App = () => {
  
  return (
   
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/home' element={<Home />}/>
      <Route path='/employee-list' element={<CreateEmployee />}/>
      <Route path='/employee/:id' element={<EmployeeDetails />}/>
      <Route path='*' element={<ErrorHandle />}/>
    </Routes>
    </BrowserRouter>
 

  )
}

export default App