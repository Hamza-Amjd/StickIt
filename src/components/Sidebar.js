import React, { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import notecontext from "../context/notes/Notecontext";
import Modal from "./Modal";

export default function Sidebar() {
  let navigate = useNavigate();
  const [logoutModal, setlogoutModal] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const context = useContext(notecontext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleclick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    setshowModal(false);
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setshowModal(false);
    setlogoutModal(false);
  };
  return (
    <>
      <div className="fixed dark top-0 left-0 h-auto min-h-screen flex flex-col shadow-2xl">
        <Link to='/'  className="text-xl mx-2 my-6 mb-12 font-semibold" >
          Stickit
        </Link>
        <FaPlus
          onClick={() => setshowModal(true)}
          className="p-3 bg-black m-2 rounded-3xl mx-auto hover:bg-teal-950 hover:rounded-xl transition-all duration-300 ease-linear hover:cursor-pointer"
          size={40}
          color="white"
        />
        <button
          onClick={()=>{setlogoutModal(true);setshowModal(true)}}
          className="absolute bottom-0 border-gray-700 border-t-2 py-3"
        >
          <BiLogOut
            className="p-2 bg-black m-2 rounded-3xl mx-4 hover:bg-teal-950 hover:rounded-xl transition-all duration-300 ease-linear hover:cursor-pointer"
            size={40}
            color="white"
          />
        </button>
      </div>
      <Modal isVisible={showModal}>
        {logoutModal?
        <div className="w-full  mx-auto p-5 m-3 rounded">
          <div className="flex flex-col text-gray-900 py-2">
            Are you sure you want to Logout?
          </div>
          <div className="flex justify-end text-gray-900 py-2">
            <button onClick={handleLogout} className="border-gray-900 p-1 border-2 rounded mx-1 hover:font-bold">Logout</button>
            <button onClick={()=>{setlogoutModal(false);setshowModal(false)}} className="border-gray-900 p-1 border-2 rounded hover:font-bold">Cancel</button>
          </div>
        </div>:
        <form className="w-full mx-auto p-5 m-3 rounded">
          <div className="flex flex-col text-gray-900 py-2">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={note.title}
              onChange={onChange}
              className="p-1 rounded focus:outline-none"
            />
          </div>
          <div className="flex flex-col text-gray-900 py-2">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={note.description}
              onChange={onChange}
              className="p-1 rounded focus:outline-none"
            />
          </div>
          <div className="flex flex-col text-gray-900 py-2">
            <label>Tag</label>
            <input
              type="text"
              name="tag"
              value={note.tag}
              onChange={onChange}
              className="p-1 rounded focus:outline-none"
            />
          </div>
          <div className="flex justify-between ">
            <button
              onClick={handleclick}
              className=" text-center font-bold  rounded p-1 "
            >
              Add
            </button>
            <button
              onClick={() => setshowModal(false)}
              className=" text-center font-bold  rounded p-1 "
            >
              Cancel
            </button>
          </div>
        </form>}
      </Modal>
    </>
  );
}
