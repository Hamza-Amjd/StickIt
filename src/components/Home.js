import React, { useContext, useEffect, useState } from "react";
import NoteItem from "./NoteItem";
import notecontext from "../context/notes/Notecontext";
import Modal from "./Modal";
import Search from "./Search";
import AddButton from "./AddButton";
import { useNavigate } from "react-router-dom";
function Home() {
  let navigate = useNavigate();
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
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      getNotes();
      setNotes(notes);
    }
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
    setSearchResults(
      notes.filter((item) => item.title.toLowerCase().includes(searchQuery))
    );
  };
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, [searchQuery]);

  return (
    <>
      <AddButton />
        <Search setsearchQuery={setsearchQuery} search={handleSearch} />
      <div className=" p-4 py-12 h-auto min-h-screen w-auto">
        {searchQuery.length > 0 ? (
          <>
            <h4 className="text-black/85 text-3xl font-bold font-popins my-6">
              Search Results
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((note) => {
                return (
                  <NoteItem
                    key={note._id}
                    note={note}
                    updatenote={updatenote}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-black/85 text-6xl font-bold font-popins my-6">
              Notes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => {
                return (
                  <NoteItem
                    key={note._id}
                    note={note}
                    updatenote={updatenote}
                  />
                );
              })}
            </div>
          </>
        )}

        <Modal isVisible={showModal}>
          <form className=" w-[400px] p-4 text-black/80  px-8 pb-8">
          <div className="flex justify-end">
            <button
                onClick={() => setshowModal(false)}
                className="text-xl active:text-lg p-1 rounded-full hover:bg-gray-600/10"
              >
                &#10060;
              </button>
          </div>
            <div className="flex flex-col text-gray-900">
              <legend className="font-bold text-2xl text-black/85 mb-3 text-center ">
                Edit Note
              </legend>
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
              <textarea
                type="text"
                name="edescription"
                value={updateNote.edescription}
                rows={4}
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
           
              <button
                onClick={handleclick}
                className="w-full rounded-md bg-blue-700 my-4 font-bold text-lg hover:bg-blue-500 p-2 text-white"
              >
                Edit
              </button>
            
          </form>
        </Modal>
      </div>
    </>
  );
}

export default Home;
