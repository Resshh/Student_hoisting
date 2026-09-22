import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInterceptor";

const Login = ({ setIsLoggedIn }) => {

  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axiosInstance.post(
        "/user/login",
        login
      );

      localStorage.setItem("logintoken", response.data.token);
      localStorage.setItem("isLoggedIn", "true");

      setIsLoggedIn(true);

      alert(response.data.message);

      navigate("/student");

    } catch (error) {

      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong");
      }

    }
  };

  return (
    <div className="form-container">

      <form onSubmit={handleSubmit}>

        <h2>Login</h2>

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

        <button type="submit">Login</button>

      </form>

    </div>
  );
};

export default Login;