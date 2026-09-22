import React, { useState } from "react";

const Login = () => {

  const [login,setLogin]=useState({

    email:"",
    password:""

  });

  const handleChange=(e)=>{

    setLogin({
      ...login,
      [e.target.name]:e.target.value
    });

  };

  const handleSubmit=(e)=>{

    e.preventDefault();

    console.log(login);

    alert("Login Successful");

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

        <button>Login</button>

      </form>

    </div>

  );
};

export default Login;