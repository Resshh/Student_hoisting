import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar1 from "./component/Navbar1";
import Home from "./component/Home";
import Register from "./component/Register";
import Student from "./component/Student";
import Feedback from "./component/Feedback";
import ProtectedRoute from "./component/ProtectedRoute";
import Update from "./component/Update";

import axiosInstance from "./axiosInterceptor";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  return (
    <>
      <Navbar1
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <Routes>
        <Route
          path="/"
          element={<Home setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        <Route
          path="/update/:rollNo"
          element={
            <ProtectedRoute>
              <Update />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <Student />
            </ProtectedRoute>
          }
        />

        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;