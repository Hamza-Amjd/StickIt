import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import Notes from './Notes'
import { useNavigate } from 'react-router-dom';

function Home() {
  let navigate=useNavigate();
  useEffect(() => {
    const token=localStorage.getItem('token')
    if(!token){
      navigate("/login")
    }
    // eslint-disable-next-line
  }, [])
  return (
    <div>
        <Notes/>
        <Sidebar/>
    </div>
  )
}

export default Home