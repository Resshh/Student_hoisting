import React, { useState } from "react";
import "../assets/home.css";
import student from "../assets/student.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInterceptor";

const Home = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "/user/login",
        login
      );

      // Store token
      localStorage.setItem("logintoken", response.data.token);

      // Optional: keep this if your app uses it
      localStorage.setItem("isLoggedIn", "true");

      setIsLoggedIn(true);

      alert(response.data.message);

      navigate("/student");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };


  return (
    <div className="home-page">
      <div className="left-side">
        <h1>
          Empowering Education,
          <br />
          <span>Managing Success</span>
        </h1>

        <p className="description">
          Our Student Management System helps manage student
          records, monitor academic performance and simplify
          administration in one place.
        </p>

        <img
          src={student}
          alt="student"
          className="student-image"
        />
      </div>

      <div className="right-side">
        <form onSubmit={handleSubmit}>
          <h2>Welcome</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={login.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={login.password}
            onChange={handleChange}
            required
          />

          <button type="submit">LOGIN</button>

          <p className="register-text">
            Don't have an account?
            <span onClick={() => navigate("/register")}>
              {" "}
              Register Here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Home;