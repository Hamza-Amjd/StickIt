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
    <div className="flex  items-center  w-full table-fixed">
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
      <div className="">
        <button
          id="dropdownDefaultButton"
          onClick={()=>setdropdown(!dropdown)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
          type="button"
        >
          Profile{" "}
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
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
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </button>
            </li>
            
            <li>
              <button onClick={()=>setshowModal(true)}
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
        </div>
      <Modal isVisible={showModal}>
        <div className="w-full  mx-auto p-5 m-3 rounded">
          <div className="flex flex-col text-gray-900 py-2">
            Are you sure you want to Logout?
          </div>
          <div className="flex justify-end text-gray-900 py-2">
            <button
              onClick={handleLogout}
              className="border-gray-900/80 p-1 border-2 rounded mx-1 hover:text-white/80 hover:bg-gray-900/80"
            >
              Logout
            </button>
            <button
              onClick={() => {
                setshowModal(false);
              }}
              className="border-gray-900/80 p-1 border-2 rounded mx-1 hover:text-white/80 hover:bg-gray-900/80"
            >
              Cancel
            </button>
          </div>
        </div>
        :
      </Modal>
    </>
  );
}
