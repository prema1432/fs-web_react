import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import NoteListPage from './pages/NoteListPage';
import Navbar from "./components/Navbar";
import NoteCreatePage from "./pages/NoteCreatePage";
import NoteEditPage from "./pages/NoteEditPage";
import NotesPagination from "./pages/NotesPagination";
import WebNotes from "./pages/WebNotes";


const App = () => {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/notes" element={<NoteListPage/>}/>
                <Route path="/webnotes" element={<WebNotes/>}/>
                <Route path="/notespg" element={<NotesPagination/>}/>
                <Route path="/create" element={<NoteCreatePage/>}/>
                <Route path="/edit/:id" element={<NoteEditPage/>}/>
            </Routes>
        </Router>
    );
};

export default App;