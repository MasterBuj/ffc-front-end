// import { useState } from 'react' 
import { NavLink, Route, Routes } from "react-router-dom";
import './App.css';
// import Navbar from "./Navbar";
import Calculator from "./pages/Calculator";
import DrumMachine from "./pages/DrumMachine";
import Home from "./pages/Home";
import MarkDownPreviewer from "./pages/MarkDownPreviewer";
import Quotes from "./pages/Quotes";
import TweentyFivePlusFiveClock from "./pages/TweentyFivePlusFiveClock";

function App() {


  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/quotes">Quotes</NavLink>
        <NavLink to="/markDownPreviewer">Mark Down</NavLink>
        <NavLink to="/drumMachine">Drum Machine</NavLink>
        <NavLink to="/calculator">Js Calculator</NavLink>
        <NavLink to="/TweentyFivePlusFiveClock">25 + 5 Clock</NavLink>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/markDownPreviewer" element={<MarkDownPreviewer />} />
          <Route path="/drumMachine" element={<DrumMachine />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/TweentyFivePlusFiveClock" element={<TweentyFivePlusFiveClock />} />


          <Route path="*" element={<h1> PAGE NOT FOUND</h1>} />
        </Routes>
      </main>

    </>
  )
}

export default App
