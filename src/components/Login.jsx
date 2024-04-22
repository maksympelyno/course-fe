import React, { useState } from "react";
import "../styles/Login.css"; // Стилі для компоненти логіну

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");

  const handleLogin = (e) => {
    if (username !== "") {
      sessionStorage.setItem("username", username);
      onLogin(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2 className="login-heading">Welcome Back!</h2>
        <p className="login-subheading">Please enter your username to continue</p>
        <div className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
          <button onClick={handleLogin} className="login-button">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
