
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import NoteState from "./context/notes/Notestate";
import ForgetPass from "./components/ForgetPass";
function App() {
  return (
    <NoteState>
        <Router>
            <Routes>
              <Route exact path="/" element={<Home/>}></Route>
              <Route exact path="/login" element={<Login/>}></Route>
              <Route exact path="/fogetpassword" element={<ForgetPass/>}></Route>
            </Routes>
        </Router>
      </NoteState>
  );
}

export default App;
