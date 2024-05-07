import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
export default function Search({ setsearchQuery, search }) {
  const [showModal, setshowModal] = useState(false);
  const [dropdown, setdropdown] = useState(false);
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setshowModal(false);
  };
  return (
    <>
    <div className="flex  items-center  w-full fixed bg-white p-2">
      <div className="flex bg-gray-100 p-3 w-full items-center justify-center  rounded-3xl text-gray-700">
        <button className="mr-2" onClick={() => search()}>
          <FaSearch size={20} />
        </button>
        <input
          type="search"
          placeholder="Search"
          onChange={(e) => setsearchQuery(e.target.value)}
          className="w-full bg-gray-100 focus:outline-none"
        />
      </div>
      <div className="px-2">
        <button
          id="dropdownDefaultButton"
          onClick={()=>setdropdown(!dropdown)}
          className="flex items-center "
          type="button"
        >
         <img src={require('../assets/emptyPfp.png')} alt="avatar" className="h-12 rounded-full" />
        </button>
        </div>
      
        <div
          id="dropdown"
          className={`z-10 ${dropdown?" ":"hidden"} absolute right-3 top-16 bg-white divide-y transition-all ease-in divide-gray-100 rounded-lg shadow w-28 dark:bg-gray-700`}
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
          >
            
            <li>
              <button
                href="#"
                className="block w-full py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </button>
            </li>
            
            <li>
              <button onClick={()=>setshowModal(true)}
                href="#"
                className="block w-full py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        </div>
      <Modal isVisible={showModal}>
        <div className="w-full  mx-auto px-5 py-2">
          <div className="flex flex-col text-gray-900 py-4">
            Are you sure you want to Logout?
          </div>
          <div className="flex justify-end text-gray-900 pt-4 gap-3">
            <button
              onClick={() => {
                setshowModal(false);
              }}
              className=" mx-1 hover:font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="mx-1 text-red-800 hover:font-semibold"
            >
              Logout
            </button>
            
          </div>
        </div>
        
      </Modal>
    </>
  );
}
