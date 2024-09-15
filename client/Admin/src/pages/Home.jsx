import React from 'react'
import HomePg from '../components/homepg/HomePg'
import Navbar from '../components/navbar/Navbar'
import '../components/homepg/HomePg.css'
const Home = () => {
  return (
    <>
    <Navbar />
       <div>
        <HomePg />
        </div>
        </>
  )
}

export default Home