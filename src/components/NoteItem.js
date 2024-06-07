import React, { useContext, useState } from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import notecontext from "../context/notes/Notecontext";
import Modal from "./Modal";
function NoteItem(props) {
  const context = useContext(notecontext);
  const { deleteNote } = context;
  const { note, updatenote } = props;
  const [showModal, setshowModal] = useState(false);
  var month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className=" w-full h-fit rounded-xl text-black/85 p-8 bg-green-300/30 shadow-xl"
    >
      <div className="text-2xl font-bold">{note.title}</div>
      <div className="font-medium">{note.description}</div>

      <div className="flex items-end justify-between  bottom-2 ">
        <div className="font-light ">
          {month[new Date(note.date).getMonth()] +
            " " +
            new Date(note.date).getDate() +
            ", " +
            new Date(note.date).getFullYear()}
        </div>
        <div>
          <motion.button whileTap={{scale:0.9}}
            onClick={() => setshowModal(true)}
            className=" rounded-full bg-black/75 "
          >
            <motion.div className="text-white p-2 hover:text-red-500"  whileHover={{ y: -5 }} whileTap={{y:0}}>
              <MdDelete size={25} />
            </motion.div>
          </motion.button>
          <motion.button whileTap={{scale:0.9}}
            onClick={() => {
              updatenote(note);
            }}
            className="rounded-full ml-1 bg-black/75"
          >
             <motion.div className="text-white p-2 hover:text-green-700" whileHover={{ y: -5 }} whileTap={{y:0}}>

              <MdModeEdit size={25}/>
             </motion.div>
          </motion.button>
        </div>
      </div>
      <Modal isVisible={showModal}>
        <div className="w-[250px] mx-auto p-6 rounded">
          <div className="flex justify-center text-red-800/80">
            <MdDelete size={50} className="" />
          </div>
          <div className="text-center font-black text-lg">Confirm Delete</div>
          <div className="text-center text-sm text-gray-500 py-2 pb-2">
            Are you sure you want to Delete?
          </div>
          <div className="flex text-gray-900 gap-2 py-2">
            <button
              onClick={() => {
                deleteNote(note._id);
                setshowModal(false);
              }}
              className="w-[50%] text-white bg-red-800/80 hover:bg-red-500/80 p-1 rounded-md"
            >
              Delete
            </button>
            <button
              onClick={() => {
                setshowModal(false);
              }}
              className="w-[50%] hover:bg-gray-600/30 p-1 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}

export default NoteItem;
