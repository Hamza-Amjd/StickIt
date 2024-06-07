import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Spinner from "./Spinner";
import { motion } from "framer-motion";

function Login() {
  let navigate = useNavigate();
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const [obsecurepass, setObsecurepass] = useState(true);
  const [registerCredentials, setRegisterCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState(false);

  const handleLogIN = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowModal(true);
    const response = await fetch(
      `https://stickit-backend.vercel.app/api/auth/login`,
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
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowModal(true);
    const response = await fetch(
      `https://stickit-backend.vercel.app/api/auth/createuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: registerCredentials.name,
          email: registerCredentials.email,
          password: registerCredentials.password,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    setLoading(false);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
    } else {
      if (json.error) {
        seterror(json.error);
      } else if (json.errors) {
        seterror(json.errors[0].msg);
      }
    }
  };
  const onChange = (e) => {
    e.preventDefault();
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const onRegisterChange = (e) => {
    e.preventDefault();
    setRegisterCredentials({
      ...registerCredentials,
      [e.target.name]: e.target.value,
    });
  };
  const logindisabled=credentials.email.length<3 || credentials.password.length<8 
  const registerdisabled=registerCredentials.name.length<3 || registerCredentials.email.length===0 || registerCredentials.password.length<8 || registerCredentials.confirmPassword !== registerCredentials.password;

  return (
    <>
      <div  className="  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col justify-center items-center transition-all ease-in h-screen">
        {isLogin ? (
          <motion.form initial={{scale:0.5}} animate={{scale:1}} transition={{type:'spring'}}  className="flex flex-col  justify-center w-[350px] sm:w-[400px]  mx-auto bg-cyan-900 p-5 m-3 border-2 rounded-xl border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] ">
            <img
              src={require("../assets/notelogo.png")}
              alt=""
              className="h-16 w-16 mb-8 self-center"
            />
            <legend className="text-2xl text-white text-center font-bold mb-6">
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
            <div className="flex flex-col text-gray-400 py-2 w-full ">
              <label>Password</label>
              <div className="flex  relative">
                <input
                  type={`${obsecurepass ? "password" : "text"}`}
                  name="password"
                  security="none"
                  onChange={onChange}
                  className="bg-cyan-700 p-1 rounded w-full focus:border-blue-500 focus:bg-cyan-500 focus:outline-none  text-white"
                />
                <button
                  type="button"
                  className="absolute right-2 top-[6px] text-white"
                  onClick={() => setObsecurepass(!obsecurepass)}
                >
                  {obsecurepass ? (
                    <FaRegEye size={20} />
                  ) : (
                    <FaRegEyeSlash size={20} />
                  )}
                </button>
              </div>
            </div>
            <div className="self-end text-gray-400 py-2">
              <Link
                to={"/fogetpassword"}
                className=" hover:underline-offset-2 hover:text-white/75 underline cursor-pointer text-end"
              >
                Forgot Password
              </Link>
            </div>
            <button
              onClick={handleLogIN}
              disabled={logindisabled}
              className={`text-white bg-gradient-to-r drop-shadow-2xl text-center font-bold w-full ${logindisabled ?" from-slate-400 to-teal-950" :"bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-pink-500 "}  rounded-2xl p-1 my-5 `}
              type="submit"
            >
              {" "}
              Log In
            </button>
            <p className="flex justify-center text-gray-400 py-2 ">
              Don't have an account?{" "}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsLogin(false);
                }}
                className=" hover:underline-offset-2 hover:text-white/75 underline cursor-pointer pl-1"
                type="button"
              >
                {" "}
                Register
              </button>
            </p>
          </motion.form>
        ) : (
          <motion.form initial={{scale:0.8}} animate={{scale:1}} transition={{type:'spring'}}  className="flex flex-col items-center justify-center w-[350px] sm:w-[450px]  mx-auto bg-cyan-900 p-5 m-3 border-2 rounded-xl border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]  ">
            <img
              src={require("../assets/notelogo.png")}
              alt=""
              className="h-16 w-16 mb-8"
            />
            <legend className="text-2xl text-white text-center font-bold mb-6">
              Create a new account
            </legend>
            <div className="flex flex-col text-gray-400 py-2 w-full">
              <label>Name</label>
              <input
                type="text"
                name="name"
                onChange={onRegisterChange}
                className="bg-cyan-700 p-1 rounded focus:border-blue-500 focus:bg-cyan-500 focus:outline-none text-white"
              />
            </div>
            <div className="flex flex-col text-gray-400 py-2 w-full">
              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={onRegisterChange}
                className="bg-cyan-700 p-1 rounded focus:border-blue-500 focus:bg-cyan-500 focus:outline-none text-white"
              />
            </div>
            <div className="flex flex-col text-gray-400 py-2 w-full relative">
              <label>Password</label>
              <div className="relative">
                <input
                  type={`${obsecurepass ? "password" : "text"}`}
                  name="password"
                  onChange={onRegisterChange}
                  className="bg-cyan-700 p-1 w-full rounded focus:border-blue-500 focus:bg-cyan-500 focus:outline-none text-white"
                />
                <button
                  type="button"
                  className="absolute right-2 top-[6px] text-white"
                  onClick={() => setObsecurepass(!obsecurepass)}
                >
                  {obsecurepass ? (
                    <FaRegEye size={20} />
                  ) : (
                    <FaRegEyeSlash size={20} />
                  )}
                </button>
              </div>
            </div>
            <div className="flex flex-col text-gray-400 py-2 w-full relative">
              <label>Confirm Password</label>
              <div className="relative">
                <input
                  type={`${obsecurepass ? "password" : "text"}`}
                  name="confirmPassword"
                  onChange={onRegisterChange}
                  className="bg-cyan-700 p-1 w-full rounded focus:border-blue-500 focus:bg-cyan-500 focus:outline-none text-white"
                />
                <button
                  type="button"
                  className="absolute right-2 top-[6px] text-white"
                  onClick={() => setObsecurepass(!obsecurepass)}
                >
                  {obsecurepass ? (
                    <FaRegEye size={20} />
                  ) : (
                    <FaRegEyeSlash size={20} />
                  )}
                </button>
              </div>
              <p className="text-red-500 text-xs absolute bottom-[-8px] left-0">{registerCredentials.password!==registerCredentials.confirmPassword  && "Password didnt match to retyped password"}</p>
            </div>
            <button
              type="submit"
              disabled={registerdisabled}
              onClick={handleRegister}
              className={`text-white bg-gradient-to-r shadow-2xl text-center font-bold w-full ${registerdisabled ?" from-slate-400 to-teal-950" :"bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-pink-500 "}  rounded-2xl p-1 my-5 `}
            >
              Register
            </button>
            <p className="flex justify-center text-gray-400 py-2 ">
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className=" hover:underline-offset-2 hover:text-white/75 underline cursor-pointer pl-1"
              >
                Log In
              </button>
            </p>
          </motion.form>
        )}
      </div>

      <Modal isVisible={showModal}>
        {loading ? (
          <div className="p-4 px-4">
           <Spinner/>
          </div>
        ) : isLogin ? (
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
        ) : (
          <div className="max-w-[250] w-full  px-8 py-4 rounded">
            <div className="flex flex-col text-gray-900 py-2 font-bold">
              {error}
            </div>
            <div className="flex justify-self-end text-red-800 font-extrabold mt-4">
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
    </>
  );
}
export default Login;
