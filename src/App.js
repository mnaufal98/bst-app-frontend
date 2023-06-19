import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import Home from "./Pages/Home/Home";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import Activation from "./Pages/Activation/Activation";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<><Profile /></>} />
        <Route path="/activation" element={<><Activation /></>} />
      </Routes>
    </>
  );
}

export default App;
