import React, { useState } from "react";
import img from "../assets/note.png";
import {  useNavigate } from "react-router-dom";
import Modal from "./Modal";
function Login() {
  let navigate = useNavigate();
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const [registerCredentials, setRegisterCredentials] = useState({name :"", email: "", password: "" });
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState(false);

  const handleLogIN = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowModal(true);
    const response = await fetch(
      `https://chocolate-shrimp-shoe.cyclic.app/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      setLoading(false);
      navigate("/");
    } else {
      setLoading(false);
    }
  };
  const handleRegister=async(e)=>{
    e.preventDefault()
    setLoading(true);
    setShowModal(true);
    const response = await fetch(`https://chocolate-shrimp-shoe.cyclic.app/api/auth/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name :registerCredentials.name ,email: registerCredentials.email, password:registerCredentials.password})
      });
      const json =await response.json();
      console.log(json)
      setLoading(false);
    if (json.success) {
        localStorage.setItem('token',json.authtoken)
        navigate("/")
    }else{
        if(json.error){
             seterror(json.error)
        }else if(json.errors){
            seterror(json.errors[0].msg)
        }
    }
   
}
  const onChange = (e) => {
    e.preventDefault();
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const onRegisterChange=(e)=>{
    e.preventDefault();
    setRegisterCredentials({...registerCredentials,[e.target.name]:e.target.value})
}
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <img
        src={img}
        alt=""
        className="h-screen w-full object-cover hidden md:block"
      />
      
      
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col justify-center items-center transition-all ease-in h-screen">
        {isLogin?<form className="flex flex-col items-center justify-center max-w-[400px] w-full mx-auto bg-cyan-900 p-5 m-3 rounded ">
          
          <img
            src={require("../assets/notelogo.png")}
            alt=""
            className="h-16 w-16 mb-8"
          />
          <legend className="text-3xl text-white text-center font-bold mb-6">
            Log In to your account
          </legend>
          <div className="flex flex-col text-gray-400 py-2 w-full">
            <label>Email</label>
            <input
              type="email"
              name="email"
              onChange={onChange}
              className="bg-cyan-700 p-1 rounded focus:border-blue-500 focus:bg-cyan-500 focus:outline-none text-white"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2 w-full">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={onChange}
              className="bg-cyan-700 p-1 rounded focus:border-blue-500 focus:bg-cyan-800 focus:outline-none  text-white"
            />
          </div>
          <div className="flex justify-end text-gray-400 py-2">
            <div className=" hover:underline-offset-2 hover:text-white/75 underline cursor-pointer text-end">
              Forgot Password
            </div>
          </div>
          <button
            onClick={handleLogIN}
            className="text-white text-center font-bold w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-pink-500 rounded p-1 "
          >
            {" "}
            Log In
          </button>
          <p className="flex justify-center text-gray-400 py-2 ">
            Don't have an account?{" "}
            <button
            onClick={()=>setIsLogin(false)}
              className=" hover:underline-offset-2 hover:text-white/75 underline cursor-pointer pl-1"
            >
              {" "}
              Register
            </button>
          </p>
          </form>
          :
          <form className="flex flex-col items-center justify-center max-w-[400px] w-full mx-auto bg-cyan-900 p-5 m-3 rounded ">
          <img
          src={require("../assets/notelogo.png")}
          alt=""
          className="h-16 w-16 mb-8"
        />
        <legend className="text-3xl text-white text-center font-bold mb-6">
          Create a new account
        </legend>
          <div className='flex flex-col text-gray-400 py-2 w-full'>
              <label>Name</label>
              <input type='text' name='name' onChange={onRegisterChange} className='bg-cyan-700 p-1 rounded focus:border-blue-500 focus:bg-cyan-500 focus:outline-none'/>
          </div>
          <div className='flex flex-col text-gray-400 py-2 w-full'>
              <label>Email</label>
              <input type='email' name='email' onChange={onRegisterChange} className='bg-cyan-700 p-1 rounded focus:border-blue-500 focus:bg-cyan-500 focus:outline-none'/>
          </div>
          <div className='flex flex-col text-gray-400 py-2 w-full'>
              <label>Password</label> 
              <input type='password' name='password' onChange={onRegisterChange} className='bg-cyan-700 p-1 rounded focus:border-blue-500 focus:bg-cyan-800 focus:outline-none'/>
          </div>
          
          <button type='submit' onClick={handleRegister} className='text-white text-center font-bold w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-pink-500 rounded p-1 my-5'>Register</button>
          <p className='flex justify-center text-gray-400 py-2 '>Already have an account? <button onClick={()=>setIsLogin(true)} to="/login" className=' hover:underline-offset-2 hover:text-white/75 underline cursor-pointer pl-1'>Log In</button></p>
        </form>}
        </div>
        
      <Modal isVisible={showModal}>
        {loading ? (<div className="p-2">
          <div role="status">
            <svg
              aria-hidden="true"
              class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div></div>
        ) :isLogin?  (
          <div className="max-w-[250] w-full  px-8 py-4 rounded">
            <div className="flex flex-col text-gray-900 py-2 font-bold">
              Invalid credentials! Please try again
            </div>
            <div className="flex justify-end text-red-800 font-extrabold mt-4">
              <button
                onClick={() => {
                  setShowModal(false);
                }}
              >
                OK
              </button>
            </div>
          </div>
        ):(
            <div className="max-w-[250] w-full  px-8 py-4 rounded">
          <div className="flex flex-col text-gray-900 py-2 font-bold">
            {error}
          </div>
          <div className="flex justify-end text-red-800 font-extrabold mt-4">
                <button
                    onClick={() => {
                        setShowModal(false);
                    }}
                    >
                    OK
                </button>
          </div>
          
          </div>
        )}
      </Modal>
    </div>
  );
}
export default Login;
