import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => (
  <div className="container">
    <h2>Welcome to the League App</h2>
    <Link to="/league">
      <div className="start-button">
        <span>Start</span>
      </div>
    </Link>
  </div>
);

export default Home;
