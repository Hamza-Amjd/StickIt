import React, { useContext, useEffect, useState } from "react";
import NoteItem from "./NoteItem";
import notecontext from "../context/notes/Notecontext";
import Modal from "./Modal";
import Search from "./Search";
function Notes() {
  const context = useContext(notecontext);
  const { notes, getNotes, editNote, setNotes } = context;
  const [showModal, setshowModal] = useState(false);
  const [searchQuery, setsearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState("");

  const [updateNote, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  useEffect(() => {
    getNotes();
    setNotes(notes);
    // eslint-disable-next-line
  }, []);

  const updatenote = (currentnote) => {
    setshowModal(true);
    setNote({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
  };
  const handleclick = (e) => {
    e.preventDefault();
    editNote(
      updateNote.id,
      updateNote.etitle,
      updateNote.edescription,
      updateNote.etag
    );
    setshowModal(false);
  };
  const onChange = (e) => {
    setNote({ ...updateNote, [e.target.name]: e.target.value });
  };
  
  const handleSearch = () => {
    if (notes===searchResults){
      setSearchResults([]) 
    }
    else{
    setSearchResults(
      notes.filter((item) => item.title.toLowerCase().includes(searchQuery))
    )}
    }
    useEffect(() => {
      if (searchQuery.length===0)setSearchResults([]);
    }, [searchQuery])
    
  return (
    <div className=" p-4 h-auto min-h-screen w-auto">
      <Search setsearchQuery={setsearchQuery} search={handleSearch} />

      <h1 className="text-black  text-6xl font-bold font-sans my-3">
        Notes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {searchResults.length === 0
          ? notes?.map((note) => {
              return (
                <NoteItem key={note._id} note={note} updatenote={updatenote} />
              );
            })
          : searchResults?.map((note) => {
              return (
                <NoteItem key={note._id} note={note} updatenote={updatenote} />
              );
            })}
      </div>
      <Modal isVisible={showModal}>
        <form className=" w-full mx-auto p-5 m-3 rounded">
          <div className="flex flex-col text-gray-900 py-2">
            <label>Title</label>
            <input
              type="text"
              name="etitle"
              value={updateNote.etitle}
              onChange={onChange}
              className="p-1 rounded focus:outline-none"
            />
          </div>
          <div className="flex flex-col text-gray-900 py-2">
            <label>Description</label>
            <input
              type="text"
              name="edescription"
              value={updateNote.edescription}
              onChange={onChange}
              className="p-1 rounded focus:outline-none"
            />
          </div>
          <div className="flex flex-col text-gray-900 py-2">
            <label>Tag</label>
            <input
              type="text"
              name="etag"
              value={updateNote.etag}
              onChange={onChange}
              className="p-1 rounded focus:outline-none"
            />
          </div>
          <div className="flex justify-between ">
            <button
              onClick={handleclick}
              className=" text-center font-bold  rounded p-1 "
            >
              Edit
            </button>
            <button
              onClick={() => setshowModal(false)}
              className=" text-center font-bold  rounded p-1 "
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Notes;
