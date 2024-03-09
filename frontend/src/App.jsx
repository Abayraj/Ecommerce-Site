import { useState } from "react";
import "./App.css";
import { Header } from "./components/layout/Header.jsx";
import { Footer } from "./components/layout/Footer.jsx";
import { Home } from "./components/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Headerr from "./components/layout/Headerr.jsx";

function App() {
  return (
    <Router>
        <Headerr/>
        <Routes> {/* Use <Routes> instead of <Router> */}
          <Route path="/" element={<Home/>} /> {/* Use 'element' prop instead of 'component' */}
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;
