import React, { useContext, useState } from 'react'
import {MdModeEdit,MdDelete} from 'react-icons/md'
import notecontext from '../context/notes/Notecontext'
import Modal from './Modal'
function NoteItem(props) {
  const context = useContext(notecontext)
  const {deleteNote}=context
  const {note,updatenote}=props
  const [showModal, setshowModal] = useState(false)
  // const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
  // '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  // '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
  // '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  // '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
  // '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  // '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
  // '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  // '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
  // '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
  // var item = colorArray[Math.floor(Math.random()*colorArray.length)];
  return (
    <div  className='max-w-[400px] w-full h-fit rounded-xl bg-emerald-600 text-white p-5 relative'>
        <div className='text-2xl font-bold'>{note.title}</div>
        <div className='font-medium'>{note.description}</div>
        <div className='absolute bottom-2 right-2'>
        <button onClick={()=>setshowModal(true)} className=' p-2 bg-emerald-700 rounded-full  hover:bg-emerald-800'>
            <MdDelete size={25} color='red'/>
        </button>
        <button onClick={()=>{updatenote(note)}} className=' p-2 bg-emerald-700 rounded-full ml-1  hover:bg-emerald-800'>
            <MdModeEdit size={25} color='white'/>
        </button>
        </div>
        <Modal isVisible={showModal}>
        <div className="max-w-[400px] w-full  mx-auto p-5 m-3 rounded">
          <div className="flex flex-col text-gray-900 py-2">
            Are you sure you want to Delete?
          </div>
          <div className="flex justify-end text-gray-900 py-2">
            <button onClick={()=>{deleteNote(note._id);setshowModal(false)}} className="border-red-800 text-red-800 p-1 border-2 rounded mx-1 hover:font-bold">Delete</button>
            <button onClick={()=>{setshowModal(false)}} className="border-gray-900 p-1 border-2 rounded hover:font-bold ">Cancel</button>
          </div>
        </div>
        </Modal>

    </div>
  )
}

export default NoteItem