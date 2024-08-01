import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AddSchool from "./Components/AddSchool/AddSchool";
import ShowSchool from "./Components/ShowSchool/ShowSchool";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <ToastContainer theme="colored" />
      <Router>
        <Routes>
          <Route path="/" element={<AddSchool />} />
          <Route path="/showschool" element={<ShowSchool />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
