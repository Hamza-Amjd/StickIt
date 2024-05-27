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
  // const colorArray = [
  //   'rgba(210, 229, 201, 1)', 'rgba(185, 131, 106, 1)', 'rgba(155, 219, 172, 1)',
  //   'rgba(157, 207, 172, 1)', 'rgba(187, 139, 170, 1)', 'rgba(249, 204, 221, 1)',
  //   'rgba(202, 112, 177, 1)', 'rgba(103, 224, 227, 1)', 'rgba(207, 240, 158, 1)',
  //   'rgba(104, 195, 163, 1)', 'rgba(211, 176, 224, 1)', 'rgba(247, 215, 148, 1)',
  //   'rgba(255, 182, 193, 1)', 'rgba(173, 216, 230, 1)', 'rgba(144, 238, 144, 1)',
  //   'rgba(250, 250, 210, 1)', 'rgba(240, 128, 128, 1)', 'rgba(32, 178, 170, 1)',
  //   'rgba(135, 206, 250, 1)', 'rgba(119, 136, 153, 1)', 'rgba(176, 196, 222, 1)',
  //   'rgba(255, 255, 224, 1)', 'rgba(250, 235, 215, 1)', 'rgba(0, 255, 255, 1)',
  //   'rgba(245, 245, 220, 1)', 'rgba(255, 228, 196, 1)', 'rgba(255, 240, 245, 1)',
  //   'rgba(124, 252, 0, 1)', 'rgba(255, 250, 205, 1)', 'rgba(173, 255, 47, 1)',
  //   'rgba(224, 255, 255, 1)', 'rgba(238, 232, 170, 1)', 'rgba(255, 228, 225, 1)',
  //   'rgba(255, 218, 185, 1)', 'rgba(245, 222, 179, 1)', 'rgba(255, 248, 220, 1)',
  //   'rgba(255, 235, 205, 1)', 'rgba(255, 239, 213, 1)', 'rgba(255, 245, 238, 1)',
  //   'rgba(245, 255, 250, 1)'
  // ]

  // var color = colorArray[Math.floor(Math.random()*colorArray.length)];

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
