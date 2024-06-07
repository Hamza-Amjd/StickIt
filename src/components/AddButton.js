import React, { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";
import notecontext from "../context/notes/Notecontext";
import Modal from "./Modal";
import { motion } from "framer-motion";

export default function AddButton({ noteslength }) {
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
  return (
    <>
      <div className="fixed bottom-8 right-8 z-10">
        <motion.div
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{
            scale: 0.8,
            rotate: -90,
            borderRadius: "100%",
          }}
          onClick={() => setshowModal(true)}
          className=" h-14 w-14 lg:h-20 lg:w-20 rounded-full flex items-center justify-center bg-green-900 hover:bg-black/95 mt-3"
        >
          
          <FaPlus className="" size={30} color="white" />
        </motion.div>
        {noteslength === 0 && (
            <p class="absolute right-16 top-0 z-10 w-60  inline-block px-3 py-2 text-sm font-medium text-white bg-gradient-to-br from-lime-800 to-green-950 rounded-lg shadow-sm " >
              Tap this button to add your first Note
            </p>
          )}
      </div>
      <Modal isVisible={showModal}>
        <form className="w-[350px] sm:w-[400px] text-black/80 p-4">
          <div className="flex justify-end ">
            <button
              onClick={() => setshowModal(false)}
              className="text-lg active:text-md p-1 rounded-full hover:bg-gray-600/10"
            >
              &#10060;
            </button>
          </div>

          <div className="flex flex-col text-gray-900">
            <legend className="font-bold  text-2xl text-black/85 mb-3 text-center ">
              Add a new note
            </legend>
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
            <textarea
              type="text"
              name="description"
              value={note.description}
              rows={3}
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
          <button
            onClick={handleclick}
            className="w-full rounded-md bg-blue-700 my-4 font-bold text-lg hover:bg-blue-500 p-2 text-white"
          >
            Add
          </button>
        </form>
      </Modal>
    </>
  );
}
