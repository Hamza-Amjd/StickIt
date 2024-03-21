import React, { useState } from 'react'
import img from '../assets/note.png'
import { Link, useNavigate } from 'react-router-dom';
 function Login() {
    let navigate=useNavigate();
    const [credentials, setcredentials] = useState({email : "", password : ""})
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`https://chocolate-shrimp-shoe.cyclic.app/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email,password:credentials.password})
          });
          const json =await response.json();
          console.log(json)
        if (json.success) {
            localStorage.setItem('token',json.authtoken)
            navigate("/")

        }
        else{
            alert('login with corrrect credientals')
        }
    }
    const onChange=(e)=>{
        e.preventDefault();
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
        <img src={img} alt='' className='h-screen w-full object-cover hidden md:block'/>
        <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col justify-center h-screen'>
            <form className='max-w-[400px] w-full mx-auto bg-cyan-900 p-5 m-3 rounded'>
            <h2 className='text-4xl text-white text-center font-bold'>LOG IN</h2>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Email</label>
                    <input type='email' name='email' onChange={onChange} className='bg-cyan-700 p-1 rounded focus:border-blue-500 focus:bg-cyan-500 focus:outline-none'/>
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Password</label> 
                    <input type='password' name='password' onChange={onChange} className='bg-cyan-700 p-1 rounded focus:border-blue-500 focus:bg-cyan-800 focus:outline-none'/>
                </div>
                <div className='flex justify-end text-gray-400 py-2'>
                    
                    <p>Forgot Password</p>
                </div>
                <button  onClick={handleSubmit} className='text-white text-center font-bold w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-pink-500 rounded p-1 '> Log In</button>
                <p className='flex justify-center text-gray-400 py-2 '>Don't have an account? <Link to="/signup" className=' focus: underline'> Register</Link></p>
            </form>
        </div>
    </div>
  )
}
export default Login