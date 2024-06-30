import React, { useState } from "react";
import Spinner from "./Spinner";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { IoMdArrowRoundBack } from "react-icons/io";
import { motion } from "framer-motion";
import ReactCodeInput from "react-code-input";
import GradientButton from "./GradientButton";


const ForgetPass = () => {
  let navigate = useNavigate();
  const [obsecurepass, setObsecurepass] = useState(true);
  const [obsecureConfpass, setObsecureConfpass] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState({
    resetToken: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showCodeForm, setShowCodeForm] = useState(false);

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShowModal(true);
    console.log(email);
    const response = await fetch(
      `https://stickit-backend.vercel.app/api/auth/forgetpassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    setLoading(false);
    if (json.success) {
      setMessage(json.success);
    } else {
      setError(json.error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null)
    setShowModal(true);
    setLoading(true);
    console.log(newPass);
    const response = await fetch(
      `https://stickit-backend.vercel.app/api/auth/resetpassword/${newPass.resetToken}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: newPass.password,
          confirmPassword: newPass.confirmPassword,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    setLoading(false);
    if (json.success) {
      setMessage(json.success);
    } else {
      setError(json.error);
    }
  };

  const onChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const onNewPasswordChange = (e) => {
    e.preventDefault();
    setNewPass({ ...newPass, [e.target.name]: e.target.value });
    console.log(newPass.resetToken)
  };
  return (
    <div className="  bg-gradient-to-r from-indigo-800 via-cyan-800 to-teal-800 nk-500 flex flex-col justify-center items-center transition-all ease-in h-screen">
      <form className="flex flex-col items-center justify-center w-[350px] sm:w-[400px]  mx-auto bg-cyan-800 p-5 m-3 border-2 rounded-xl border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] relative">
                {!showCodeForm ? (
          <>
          <motion.button onClick={()=>navigate('/login')} className="text-white absolute left-3 top-3" whileHover={{ scale:1.1 }} whileTap={{y:0.9}} >
            <IoMdArrowRoundBack size={30} />
          </motion.button>
            <legend className="text-xl text-white text-center font-bold mb-2 pt-8 pb-3">
              Enter your email to recover your account
            </legend>
            <div class="relative z-0 w-full mb-5">
              <input
                type="email"
                name="email"
                placeholder=" "
                onChange={onChange}
                class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 border-gray-200 text-white"
              />
              <label
                for="email"
                class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
              >
                Enter email address
              </label>
            </div>
            <GradientButton name={"Next"} handlePress={handleForgetPassword}/>
          </>
        ) : (
          <>
          <motion.button onClick={()=>setShowCodeForm(false)} className="text-white absolute left-3 top-3"  whileHover={{ scale:1.1 }} whileTap={{y:0.9}} >
            <IoMdArrowRoundBack  size={30} />
          </motion.button>
            <legend className="text-xl text-white text-center font-bold mb-2 pt-8">
              Enter OTP
            </legend>
            <p  className="text-md text-slate-400 text-center">Code sent to {email}</p>
            <div className="flex flex-col text-gray-400 py-2 w-full">
              <div className="self-center">
              <ReactCodeInput type='text' style={{caretColor:'white'}} fields={4} name="resetToken" onChange={(value)=>{setNewPass({"resetToken":value})}}/>
              </div>
            </div>
            <legend className="text-xl text-white text-center font-bold mb-2 pt-8 pb-2">
              Enter your new password
            </legend>
            <div class="relative z-0 w-full mb-5">
              <input
                name="password"
                placeholder=" "
                type={`${obsecurepass ? "password" : "text"}`}
                onChange={onNewPasswordChange}
                class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 border-gray-200 text-white"
              />
              <label
                for="password"
                class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
              >
                Enter password
              </label>
              <button
                type="button"
                className="absolute right-2 top-4 text-white"
                onClick={() => setObsecurepass(!obsecurepass)}
              >
                {obsecurepass ? (
                  <FaRegEye size={20} />
                ) : (
                  <FaRegEyeSlash size={20} />
                )}
              </button>
              <span class="text-sm text-red-600 hidden" id="error">
                Password is required
              </span>
            </div>
            <div class="relative z-0 w-full mb-5">
              <input
                name="confirmPassword"
                onChange={onNewPasswordChange}
                placeholder=" "
                type={`${obsecureConfpass ? "password" : "text"}`}
                class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 border-gray-200 text-white"
              />
              <label
                for="password"
                class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
              >
                Confirm Password
              </label>
              <button
                type="button"
                className="absolute right-2 top-4 text-white"
                onClick={() => setObsecureConfpass(!obsecureConfpass)}
              >
                {obsecureConfpass ? (
                  <FaRegEye size={20} />
                ) : (
                  <FaRegEyeSlash size={20} />
                )}
              </button>
              <span class="text-xs text-red-600 font-semibold " id="error">
              {newPass.password!==newPass.confirmPassword  && "Password didnt match to retyped password"}
              </span>
            </div>
            <GradientButton name={"Update"} handlePress={handleResetPassword}/>
          </>
        )}
      </form>
      <Modal isVisible={showModal}>
        {loading ? (
          <div className="p-4 px-6">
            <Spinner />
          </div>
        ) : (
          <div className="max-w-[250] w-full  px-8 py-4 rounded">
            <div className="flex flex-col text-gray-900 py-2 font-bold">
              {message || error}
            </div>
            <div className="flex justify-end text-red-800 font-extrabold mt-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  if (showCodeForm && !error) navigate("/login");
                  else if (error) setShowModal(false);
                  else setShowCodeForm(true);
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
};

export default ForgetPass;
