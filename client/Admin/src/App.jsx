import React from 'react'
import './App.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import ErrorHandle from './components/error/ErrorHandle'
import CreateEmployee from './components/createEmployee/CreateEmployee'
import EmployeeDetails from './components/createEmployee/EmployeeDetails'
import PrivateRoute from './components/PrivateRoute'
import LoginFl from './components/login/LoginFl'

const App = () => {
  
  return (
   
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<LoginFl />} /> {/* Public route */}
        
        {/* Private routes wrapped in PrivateRoute */}
        <Route element={<PrivateRoute />}>
          <Route path='/home' element={<Home />} />
          <Route path='/employee-list' element={<CreateEmployee />} />
          <Route path='/employee/:id' element={<EmployeeDetails />} />
        </Route>

        <Route path='*' element={<ErrorHandle />} /> {/* Catch-all route */}
      </Routes>
    </BrowserRouter>
 

  )
}

export default App