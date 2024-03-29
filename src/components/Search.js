import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
export default function Search({ setsearchQuery, search }) {
  const [showModal, setshowModal] = useState(false);
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setshowModal(false);
  };
  return (
    <div className="flex items-center w-full">
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
      <div className="flex items-center justify-center bg-white/80 hover:bg-black/75 hover:text-white border-solid border-2 border-black p-2 rounded-2xl ml-2">
        <button onClick={() => setshowModal(true)} className="flex">
          <MdOutlineLogout size={20} />
          Logout
        </button>
      </div>
      <Modal isVisible={showModal}>
        <div className="w-full  mx-auto p-5 m-3 rounded">
          <div className="flex flex-col text-gray-900 py-2">
            Are you sure you want to Logout?
          </div>
          <div className="flex justify-end text-gray-900 py-2">
            <button
              onClick={handleLogout}
              className="border-gray-900 p-1 border-2 rounded mx-1 hover:font-bold"
            >
              Logout
            </button>
            <button
              onClick={() => {
                setshowModal(false);
              }}
              className="border-gray-900 p-1 border-2 rounded hover:font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
        :
      </Modal>
    </div>
  );
}
