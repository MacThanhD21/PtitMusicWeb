import "./App.css";

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Loader from "./components/Loader";

import { useState, useEffect } from "react";

function App() {
  return (
    <>
      <Loader />
      
      <Navbar />

      <Header />
    </>
  );
}

export default App;
