import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = ({ onLogin }) => {
  const username = sessionStorage.getItem("username");

  const handleLogout = () => {
    sessionStorage.removeItem("username");
    onLogin(false);
  };

  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/search" className="nav-link">
              Search
            </Link>
          </li>
          {username === "admin" && (
            <>
              <li className="nav-item">
                <Link to="/add" className="nav-link">
                  Add
                </Link>
              </li>
            </>
          )}
          <li className="nav-item">
            <Link to="/statistics" className="nav-link">
              Statistics
            </Link>
          </li>
        </ul>
      </nav>
      <div className="logout-container">
        <h4 className="username">{username}</h4>
        <button onClick={handleLogout} className="logout-button">
          <Link to="/" className="nav-link">
            Log Out
          </Link>
        </button>
      </div>
    </header>
  );
};

export default Header;
