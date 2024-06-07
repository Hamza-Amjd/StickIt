import React, { useState } from "react";
import Spinner from "./Spinner";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { IoMdArrowRoundBack } from "react-icons/io";
import { motion } from "framer-motion";
import ReactCodeInput from "react-code-input";


const ForgetPass = () => {
  let navigate = useNavigate();
  const [obsecurepass, setObsecurepass] = useState(true);
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
    <div className="  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col justify-center items-center transition-all ease-in h-screen">
      <form className="flex flex-col items-center justify-center w-[350px] sm:w-[400px]  mx-auto bg-cyan-900 p-5 m-3 border-2 rounded-xl border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] relative">
                {!showCodeForm ? (
          <>
          <motion.button onClick={()=>navigate('/login')} className="text-white absolute left-3 top-3" whileHover={{ scale:1.1 }} whileTap={{y:0.9}} >
            <IoMdArrowRoundBack size={30} />
          </motion.button>
            <legend className="text-xl text-white text-center font-bold mb-2 pt-8">
              Enter your email to recover your account
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
            <button
              type="submit"
              onClick={handleForgetPassword}
              className="text-white text-center font-bold w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-pink-500 rounded-2xl p-1 my-5 shadow-2xl"
            >
              Next
            </button>
          </>
        ) : (
          <>
          <motion.button onClick={()=>setShowCodeForm(false)} className="text-white absolute left-3 top-3"  whileHover={{ scale:1.1 }} whileTap={{y:0.9}} >
            <IoMdArrowRoundBack  size={30} />
          </motion.button>
            <legend className="text-xl text-white text-center font-bold mb-2 pt-8">
              Enter code sent to your email and new password
            </legend>
            <div className="flex flex-col text-gray-400 py-2 w-full">
              <div className="self-center">
              <ReactCodeInput type='text' fields={4} name="resetToken" onChange={(value)=>{setNewPass({"resetToken":value})}}/>
              </div>
            </div>
            <div className="flex flex-col text-gray-400 py-2 w-full">
              <label>Password</label>
              <div className="relative">
                <input
                  type={`${obsecurepass ? "password" : "text"}`}
                  name="password"
                  onChange={onNewPasswordChange}
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
                  onChange={onNewPasswordChange}
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
              <p className="text-red-500 text-xs absolute bottom-[-8px] left-0">{newPass.password!==newPass.confirmPassword  && "Password didnt match to retyped password"}</p>
            </div>
            <button
              type="submit"
              onClick={handleResetPassword}
              className="text-white text-center font-bold shadow-2xl w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-pink-500 p-1 my-5 rounded-2xl"
            >
              Update
            </button>
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
